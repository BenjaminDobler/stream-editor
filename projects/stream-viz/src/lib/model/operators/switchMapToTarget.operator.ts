import { Emitter } from '../emitter/emitter';
import { Operator } from './base.operator';
import { TakeUntilOperator } from './takeuntil.operator';

export class SwitchMapToOperatorTarget extends Operator {
  public override type: string = 'switchMapToTarget';
  public takeUntilSource?: TakeUntilOperator;

    public isActive = false;
  

  override init(): void {
    //throw new Error("Method not implemented.");
  }
  override impact(item: any): void {
    //throw new Error("Method not implemented.");
    this.emit$.next(item);
  }
  override setInputEmitters(e: Emitter[]): void {
    console.log("Method not implemented. set Emitters ", e);
  }

  activateChain() {
    console.log('activate chain');
    this.isActive = true;
    this.app.updateOperatorInputs();
  }
}
