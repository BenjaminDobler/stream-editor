import { fromEvent, Subject, take, takeUntil } from 'rxjs';
import { Emitter } from '../emitter/emitter';
import { Operator } from './base.operator';
import { TakeUntilOperatorTarget } from './takeuntil-target.operator';
import { ObservableEmitter } from '../emitter/observable.emitter';

export class TakeUntilOperator extends Operator {
  public override type: string = 'takeuntil';
  public triggered = false;
  public targetOperator?: TakeUntilOperatorTarget;

  selectTarget(event: PointerEvent, stage: any) {
    const mousedown$ = fromEvent<MouseEvent>(document, 'mousedown');
    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');

    const stageRect = stage.getBoundingClientRect();
    const target: TakeUntilOperatorTarget = this.app.addOperator({
      implementation: TakeUntilOperatorTarget,
      name: 'takeUntilTarget',
    });

    this.addTarget(target);

    target.x.update((x) => event.clientX - stageRect.x);
    target.y.update((y) => event.clientY - stageRect.y);
    target.height.update(() => 20);

    mousedown$.pipe(take(1)).subscribe((e) => {
      target.x.update((x) => e.clientX - stageRect.x);
      target.y.update((y) => e.clientY - stageRect.y);
    });
    mousemove$.pipe(takeUntil(mousedown$)).subscribe((e) => {
      target.x.update((x) => e.clientX - stageRect.x);
      target.y.update((y) => e.clientY - stageRect.y);
    });
  }
  override init(): void {
    //throw new Error("Method not implemented.");
  }

  addTarget(target: TakeUntilOperatorTarget) {
    target.emit$.subscribe(() => {
      console.log('---------- triggered');
      this.triggered = true;
      this.app.updateOperatorInputs();
    });
    this.targetOperator = target;
    target.sourceOperator = this;
  }

  impact(item: any) {
    console.log('Impact!');
    if (this.inputEmitterObservables.hasOwnProperty(item.emitterID)) {
      this.inputEmitterObservables[item.emitterID].source.next(item);
    } else {
      console.log('NO EMITTER SET ', item.emitterID);
    }
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
        const source = new Subject();
        emitter.x.update(() => this.x() + this.width());
        emitter.y.update(() => e.y());
        emitter.width = 5;
        this.app.addEmitter(emitter);
        this.inputEmitterObservables[e.id] = {
          source,
          observable: source.asObservable(),
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
