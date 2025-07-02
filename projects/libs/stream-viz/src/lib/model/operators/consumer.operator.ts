import { BehaviorSubject } from 'rxjs';
import { Emitter } from '../emitter/emitter';
import { Operator } from './base.operator';

export class ConsumerOperator extends Operator {
  override type = 'consumer';

  protected override _value1: any = 'consumer';
  public override get value1() {
    return this._value1;
  }
  public override set value1(value) {
    this._value1 = value;
  }

  reset() {}

  getCode() {
    return '';
  }

  impact(item: any) {
    this.count.update((x) => x + 1);
  }

  init() {}

  //input emitters
  setInputEmitters(e: Emitter[]) {
    let hasNewEmitters = false;

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
        inp.emitter.x.set(this.x() + this.width() + 5);
        inp.emitter.y.set(inp.sourceEmitter.y());
      }
    });
  }
}
