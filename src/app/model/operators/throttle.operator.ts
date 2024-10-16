import { BehaviorSubject, Subject, switchMap, throttleTime } from 'rxjs';
import { Operator } from './base.operator';
import { Emitter } from '../emitter';

export class ThrottleOperator extends Operator {
  override type = 'throttle';
  public override get throttleTime() {
    return this._throttleTime;
  }
  public override set throttleTime(value) {
    this._throttleTime = value;
    this.throttleTime$.next(value);
  }

  throttleTime$ = new BehaviorSubject<number>(2000);

  impact(item: any) {
    if (this.inputEmitterObservables.hasOwnProperty(item.emitterID)) {
      this.inputEmitterObservables[item.emitterID].source.next(item);
    } else {
      console.log('NO EMITTER SET ', item.emitterID);
    }
  }

  init() {}

  //input emitters
  setEmitters(e: Emitter[]) {
    let hasNewEmitters = false;
    e.forEach((e) => {
      if (!this.inputEmitterObservables.hasOwnProperty(e.id)) {
        hasNewEmitters = true;
        const emitter = new Emitter(
          this.onItem,
          'observable',
          this.app.emitters.length,
        );
        emitter.belongsToOperator = this;
        emitter.color = e.color;
        const source = new Subject();
        emitter.x.update(() => this.x() + this.width());
        emitter.y.update(() => e.y());
        emitter.width = 5;
        this.app.emitters.update(emitters=> [...emitters, emitter]);
        this.inputEmitterObservables[e.id] = {
          source,
          observable: this.throttleTime$.pipe(
            switchMap((t) => source.asObservable().pipe(throttleTime(t))),
          ),
          emitter: emitter,
          sourceEmitter: e,
        };
        emitter.activate(this.inputEmitterObservables[e.id].observable);
      }
    });

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
