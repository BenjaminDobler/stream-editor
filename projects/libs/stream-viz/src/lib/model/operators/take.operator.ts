import { BehaviorSubject, Subject, switchMap, take, tap, throttleTime } from 'rxjs';
import { Operator } from './base.operator';
import { Emitter } from '../emitter/emitter';
import { ObservableEmitter } from '../emitter/observable.emitter';

export class TakeOperator extends Operator {
  protected override _value1: any = 5;
  override type = 'take';
  getCode() {
    return `take(${this.value1})`;
  }
  impact(item: any) {
    if (this.inputEmitterObservables.hasOwnProperty(item.emitterID)) {
      this.inputEmitterObservables[item.emitterID].source.next(item);
    }
  }

  reset() {
    this.value1 = this.value1; // to reset
    this.count.update(() => 0);
  }

  init() {
    this.value1 = 5;
  }

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
        emitter.valueType = e.valueType;

        const source = new Subject();
        emitter.x.update(() => this.x() + this.width() + 2);
        emitter.y.update(() => e.y());
        emitter.width = 10;
        this.app.addEmitter(emitter);
        this.inputEmitterObservables[e.id] = {
          source,
          observable: this.value1$.pipe(
            tap(() => {
              this.completed.update((x) => false);
              this.app.updateOperatorInputs();
            }),
            switchMap((t) =>
              source.asObservable().pipe(
                take(t),
                tap({
                  complete: () => {
                    this.completed.update((x) => true);
                    this.app.updateOperatorInputs();
                  },
                }),
              ),
            ),
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
        inp.emitter.x.update(() => this.x() + this.width() + 2);
        inp.emitter.y.update(() => inp.sourceEmitter.y());
      }
    });
  }
}
