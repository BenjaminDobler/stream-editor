import { fromEvent, Subject, Subscription, take, takeUntil } from 'rxjs';
import { Emitter } from '../emitter/emitter';
import { Operator } from './base.operator';
import { TakeUntilOperatorTarget } from './takeuntil-target.operator';
import { ObservableEmitter } from '../emitter/observable.emitter';
import { SwitchMapToOperatorTarget } from './switchMapToTarget.operator';

export class SwitchMapToOperator extends Operator {
  public override type: string = 'switchMapTo';
  public triggered = false;
  public targetOperator?: SwitchMapToOperatorTarget;

  combineEmitter?: Emitter;
  combineSubscription?: Subscription;
  combineOutput: Subject<any> = new Subject<any>();

  selectTarget(event: PointerEvent, stage: any) {
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

  addTarget(target: SwitchMapToOperatorTarget) {
    target.emit$.subscribe((item) => {
      console.log('swtichMap target emitted item!');
      this.triggered = true;
      this.app.updateOperatorInputs();
      this.combineOutput.next(item);
    });
    this.targetOperator = target;
  }

  impact(item: any) {
    console.log('switch to emitter - reset emitter');
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

      emitter.x.update(() => this.x() + this.width() + 1);
      emitter.y.update(() => this.y() + this.height() / 2 - 10);
      emitter.width = 5;
      this.app.addEmitter(emitter);
      this.combineEmitter = emitter;
      emitter.activate(this.combineOutput);
      this.app.updateOperatorInputs();
    }

    if (this.combineEmitter) {
      this.combineEmitter.x.update(() => this.x() + this.width() + 1);
      this.combineEmitter.y.update(() => this.y() + this.height() / 2 - 10);
    }
  }
}
