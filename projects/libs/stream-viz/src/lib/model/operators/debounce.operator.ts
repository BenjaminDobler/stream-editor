import { debounceTime, Subject, switchMap } from 'rxjs';
import { Emitter } from '../emitter/emitter';
import { Operator } from './base.operator';
import { ObservableEmitter } from '../emitter/observable.emitter';
import { signal, WritableSignal } from '@angular/core';

export class DebounceOperator extends Operator {
  override type = 'debounce';

  override width: WritableSignal<number> = signal(120);

  getCode() {
    return `debounceTime(${this.value1})`;
  }

  reset() {}

  impact(item: any) {
    if (this.inputEmitterObservables.hasOwnProperty(item.emitterID)) {
      this.inputEmitterObservables[item.emitterID].source.next(item);
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
        emitter.valueType = e.valueType;

        const source = new Subject();
        emitter.x.set(this.x() + this.width() + 2);
        emitter.y.set(e.y());
        emitter.width = 10;
        this.app.addEmitter(emitter);
        this.inputEmitterObservables[e.id] = {
          source,
          observable: this.value1$.pipe(switchMap((t) => source.asObservable().pipe(debounceTime(t)))),
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
        inp.emitter.x.set(this.x() + this.width() + 2);
        inp.emitter.y.set(inp.sourceEmitter.y());
      }
    });
  }
}
