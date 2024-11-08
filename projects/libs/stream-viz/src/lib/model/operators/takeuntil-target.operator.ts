import { signal, WritableSignal } from '@angular/core';
import { Emitter } from '../emitter/emitter';
import { Operator } from './base.operator';
import { TakeUntilOperator } from './takeuntil.operator';

export class TakeUntilOperatorTarget extends Operator {
  getCode() {
    return '';
  }

  reset() {}
  override width: WritableSignal<number> = signal(20);

  public override type: string = 'takeuntiltarget';
  public sourceOperator?: TakeUntilOperator;

  override init(): void {
    //throw new Error("Method not implemented.");
  }
  override impact(item: any): void {
    //throw new Error("Method not implemented.");
    this.emit$.next(item);
  }
  override setInputEmitters(e: Emitter[]): void {
    //throw new Error("Method not implemented.");
  }
}
