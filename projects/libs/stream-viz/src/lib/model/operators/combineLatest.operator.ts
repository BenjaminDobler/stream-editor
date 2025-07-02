import { combineLatest, Subject, Subscription } from 'rxjs';
import { Emitter } from '../emitter/emitter';
import { Operator } from './base.operator';
import { ObservableEmitter } from '../emitter/observable.emitter';

export class CombineLatestOperator extends Operator {
  init() {}

  override type = 'combineLatest';
  combineEmitter?: Emitter;
  combineSubscription?: Subscription;
  combineOutput: Subject<any> = new Subject<any>();

  getCode() {
    return `combineLatest(TODO)`;
  }

  reset() {}

  impact(item: any) {
    if (this.inputEmitterObservables.hasOwnProperty(item.emitterID)) {
      this.inputEmitterObservables[item.emitterID].source.next(item);
    }
  }

  //input emitters
  setInputEmitters(e: Emitter[]) {
    if (e.length > 0 && !this.combineEmitter) {
      const emitter = new ObservableEmitter();
      emitter.belongsToOperator = this;
      emitter.x.set(this.x() + this.width() + 1);
      emitter.y.set(this.y() + this.height() / 2 - 10);
      emitter.width = 5;
      this.app.addEmitter(emitter);
      this.combineEmitter = emitter;
      emitter.activate(this.combineOutput);
      this.app.updateOperatorInputs();
    }

    if (e.length === 0 && this.combineEmitter) {
      this.app.emitters.update((emitters) => emitters.filter((e) => e !== this.combineEmitter));
      this.combineEmitter.destroy();
      this.combineEmitter = undefined;
    }

    if (this.combineEmitter) {
      this.combineEmitter.x.set(this.x() + this.width() + 5);
      this.combineEmitter.y.set(this.y() + this.height() / 2);
    }

    let hasNewEmitters = false;
    let combinedEmitterTypes: string[] = [];
    e.forEach((e) => {
      combinedEmitterTypes.push(e.valueType);

      if (!this.inputEmitterObservables.hasOwnProperty(e.id)) {
        hasNewEmitters = true;

        const source = new Subject();
        this.inputEmitterObservables[e.id] = {
          source,
        };
      }
    });

    if (this.combineEmitter) {
      this.combineEmitter.valueType = `[${combinedEmitterTypes.join(',')})]`;
    }

    const toRemove = Object.keys(this.inputEmitterObservables).filter((k) => !e.find((em) => em.id === +k));
    toRemove.forEach((k) => {
      delete this.inputEmitterObservables[k];
    });

    const sources = Object.keys(this.inputEmitterObservables).map((key) => this.inputEmitterObservables[key].source);
    if (this.combineSubscription) {
      this.combineSubscription.unsubscribe();
    }
    this.combineSubscription = combineLatest(sources).subscribe((data) => {
      this.combineOutput.next(data);
    });

    if (hasNewEmitters) {
      // this.app.updateObstacleInputs();
    }
  }
}
