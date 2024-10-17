import { BehaviorSubject } from 'rxjs';
import { Emitter } from '../emitter/emitter';
import { Operator } from './base.operator';

export class ConsumerOperator extends Operator {
  override type = 'consumer';
  public override get throttleTime() {
    return this._throttleTime;
  }
  public override set throttleTime(value) {
    this._throttleTime = value;
    this.throttleTime$.next(value);
  }

  throttleTime$ = new BehaviorSubject<number>(2000);

  impact(item: any) {
    console.log('on consumer impact');
    this.count++;
  }

  init() {}

  //input emitters
  setEmitters(e: Emitter[]) {
    let hasNewEmitters = false;

    const toRemove = Object.keys(this.inputEmitterObservables).filter(
      (k) => !e.find((em) => em.id === +k),
    );

    toRemove.forEach((k) => {
      const val = this.inputEmitterObservables[k];
      this.app.emitters.update((emitters) =>
        emitters.filter((e) => e !== val.emitter),
      );
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
