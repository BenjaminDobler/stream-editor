import { combineLatest, merge, Observable, Subject, Subscription } from 'rxjs';
import { Operator } from './base.operator';
import { Emitter } from '../emitter/emitter';
import { ObservableEmitter } from '../emitter/observable.emitter';

export class MergeOperator extends Operator {
  init() {}

  override type = 'merge';

  impact(item: any) {
    // this.items.next(item);
    if (this.inputEmitterObservables.hasOwnProperty(item.emitterID)) {
      this.inputEmitterObservables[item.emitterID].source.next(item);
    } else {
      console.log('NO EMITTER SET ', item.emitterID);
    }
  }

  combineEmitter?: Emitter;
  combineSubscription?: Subscription;
  combineOutput: Subject<any> = new Subject<any>();

  //input emitters
  setInputEmitters(e: Emitter[]) {
    if (e.length > 0 && !this.combineEmitter) {
      const emitter = new ObservableEmitter();
      emitter.belongsToOperator = this;
      emitter.x.update(() => this.x() + this.width() + 1);
      emitter.y.update(() => this.y() + this.height() / 2 - 10);
      emitter.width = 5;
      this.app.addEmitter(emitter);
      this.combineEmitter = emitter;
      emitter.activate(this.combineOutput);
      this.app.updateOperatorInputs();
    }

    if (e.length === 0 && this.combineEmitter) {
      this.app.emitters.update((emitters) =>
        emitters.filter((e) => e !== this.combineEmitter),
      );
      this.combineEmitter.destroy();
      this.combineEmitter = undefined;
    }

    if (this.combineEmitter) {
      this.combineEmitter.x.update(() => this.x() + this.width() + 5);
      this.combineEmitter.y.update(() => this.y() + this.height() / 2 - 10);
    }

    let hasNewEmitters = false;
    e.forEach((e) => {
      if (!this.inputEmitterObservables.hasOwnProperty(e.id)) {
        hasNewEmitters = true;

        const source = new Subject();
        this.inputEmitterObservables[e.id] = {
          source,
        };
      }
    });

    const toRemove = Object.keys(this.inputEmitterObservables).filter(
      (k) => !e.find((em) => em.id === +k),
    );
    toRemove.forEach((k) => {
      delete this.inputEmitterObservables[k];
    });

    const sources = Object.keys(this.inputEmitterObservables).map(
      (key) => this.inputEmitterObservables[key].source,
    );
    if (this.combineSubscription) {
      this.combineSubscription.unsubscribe();
    }
    this.combineSubscription = merge(...sources).subscribe((data) => {
      console.log('merge fire');
      this.combineOutput.next(data);
    });

    if (hasNewEmitters) {
      // this.app.updateObstacleInputs();
    }
  }
}
