import { signal, WritableSignal } from '@angular/core';
import { Emitter } from '../emitter/emitter';
import { Operator } from './base.operator';
import { TakeUntilOperator } from './takeuntil.operator';

export class SwitchMapToOperatorTarget extends Operator {
  override width: WritableSignal<number> = signal(20);

  public override type = 'switchMapToTarget';
  public sourceOperator?: TakeUntilOperator;

  public isActive = false;

  getCode() {
    return ``;
  }

  override init(): void {}
  override impact(item: any): void {
    this.emit$.next(item);
  }
  override setInputEmitters(e: Emitter[]): void {}

  reset() {}

  activateChain() {
    this.isActive = true;
    this.app.resetLineWithOperator(this);
    this.app.updateOperatorInputs();
  }
}
