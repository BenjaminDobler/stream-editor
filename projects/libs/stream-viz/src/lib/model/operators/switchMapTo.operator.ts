import { fromEvent, Subject, Subscription, take, takeUntil } from 'rxjs';
import { Emitter } from '../emitter/emitter';
import { Operator } from './base.operator';
import { TakeUntilOperatorTarget } from './takeuntil-target.operator';
import { ObservableEmitter } from '../emitter/observable.emitter';
import { SwitchMapToOperatorTarget } from './switchMapToTarget.operator';
import { signal, WritableSignal } from '@angular/core';

export class SwitchMapToOperator extends Operator {
  public override type = 'switchMapTo';
  public triggered = false;
  public targetOperator?: SwitchMapToOperatorTarget;
  override width: WritableSignal<number> = signal(126);

  combineEmitter?: Emitter;
  combineSubscription?: Subscription;
  combineOutput: Subject<any> = new Subject<any>();

  reset() {}
  getCode() {
    if (this.targetOperator) {
      const line = this.app.getLineWithOperator(this.targetOperator);
      const switchToEmitter = line?.emitters.find((x) => x.isStartEmitter);
      return `switchMap(x => stream${switchToEmitter?.id}$)`;
    }

    return `switchMap(x=>TODO: target stream)`;
  }

  selectTarget(event: PointerEvent) {
    const stage = this.app.stage()?.nativeElement;
    const mousedown$ = fromEvent<MouseEvent>(document, 'mousedown');
    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');

    const stageRect = stage.getBoundingClientRect();
    const target: SwitchMapToOperatorTarget = this.app.addOperator({
      implementation: SwitchMapToOperatorTarget,
      name: 'switchMapToTarget',
    }) as any;
    // target.takeUntilSource = this;

    this.addTarget(target);
    target.x.update((x) => event.clientX - stageRect.x);
    target.y.update((y) => event.clientY - stageRect.y);
    target.height.update(() => 20);

    mousedown$.pipe(take(1)).subscribe((e) => {
      target.x.update((x) => e.clientX - stageRect.x - target.width() / 2);
      target.y.update((y) => e.clientY - stageRect.y - target.height() / 2);
    });
    mousemove$.pipe(takeUntil(mousedown$)).subscribe((e) => {
      target.x.update((x) => e.clientX - stageRect.x - target.width() / 2);
      target.y.update((y) => e.clientY - stageRect.y - target.height() / 2);
    });
  }
  override init(): void {
    //throw new Error("Method not implemented.");
  }

  addTarget(target: SwitchMapToOperatorTarget) {
    target.emit$.subscribe((item) => {
      this.triggered = true;
      this.app.updateOperatorInputs();
      this.combineOutput.next(item);
    });
    this.targetOperator = target;
  }

  impact(item: any) {
    if (this.targetOperator) {
      this.app.resetLineWithOperator(this.targetOperator);

      this.targetOperator.activateChain();
    }
  }

  //input emitters
  setInputEmitters(e: Emitter[]) {
    if (e.length > 0 && !this.combineEmitter) {
      const emitter = new ObservableEmitter();
      emitter.belongsToOperator = this;

      emitter.x.update(() => this.x() + this.width() + 2);
      emitter.y.update(() => this.y() + this.height() / 2);
      emitter.width = 10;
      this.app.addEmitter(emitter);
      this.combineEmitter = emitter;
      emitter.activate(this.combineOutput);
      this.app.updateOperatorInputs();
    }

    if (this.combineEmitter) {
      this.combineEmitter.x.update(() => this.x() + this.width() + 2);
      this.combineEmitter.y.update(() => this.y() + this.height() / 2);
    }
  }
}
