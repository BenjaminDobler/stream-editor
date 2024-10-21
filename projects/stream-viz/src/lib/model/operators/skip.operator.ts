import { BehaviorSubject, debounceTime, skip, Subject, switchMap, tap, throttleTime } from 'rxjs';
import { Operator } from './base.operator';
import { Emitter } from '../emitter/emitter';
import { ObservableEmitter } from '../emitter/observable.emitter';

export class SkipOperator extends Operator {
  override type = 'skip';

  impact(item: any) {
    this.count.update((x) => x + 1);
    if (this.inputEmitterObservables.hasOwnProperty(item.emitterID)) {
      this.inputEmitterObservables[item.emitterID].source.next(item);
    } else {
      console.log('NO EMITTER SET ', item.emitterID);
    }
  }

  init() {}

  //input emitters
  setInputEmitters(e: Emitter[]) {
    let hasNewEmitters = false;
    e.forEach((e) => {
      if (!this.inputEmitterObservables.hasOwnProperty(e.id)) {
        hasNewEmitters = true;
        const emitter = new ObservableEmitter();
        emitter.belongsToOperator = this;
        emitter.color = e.color;
        emitter.previousEmitter = e;
        const source = new Subject();
        emitter.x.update(() => this.x() + this.width());
        emitter.y.update(() => e.y());
        emitter.width = 5;
        this.app.addEmitter(emitter);
        this.inputEmitterObservables[e.id] = {
          source,
          observable: this.value1$.pipe(
            tap(() => {
              this.count.update((x) => 0);
            }),
            switchMap((t) => source.asObservable().pipe(skip(t))),
          ),
          emitter: emitter,
          sourceEmitter: e,
        };
        emitter.activate(this.inputEmitterObservables[e.id].observable);
      }
    });

    const toRemove = Object.keys(this.inputEmitterObservables).filter((k) => !e.find((em) => em.id === +k));

    toRemove.forEach((k) => {
      const val = this.inputEmitterObservables[k];
      this.app.emitters.update((emitters) => emitters.filter((e) => e !== val.emitter));
      this.inputEmitterObservables[k].emitter.destroy();
      delete this.inputEmitterObservables[k];
    });

    if (hasNewEmitters) {
      this.app.updateOperatorInputs();
    }
    Object.keys(this.inputEmitterObservables).forEach((k) => {
      const inp = this.inputEmitterObservables[k];
      if (inp.emitter) {
        inp.emitter.x.update(() => this.x() + this.width() + 5);
        inp.emitter.y.update(() => inp.sourceEmitter.y());
      }
    });
  }
}
