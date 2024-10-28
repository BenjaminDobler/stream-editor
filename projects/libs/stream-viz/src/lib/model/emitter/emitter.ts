import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Item } from '../item';
import { Operator } from '../operators/base.operator';
import { signal, WritableSignal } from '@angular/core';
import { IDGenerator } from '../../it.generator';

function getRandomColor() {
  var symbols = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += symbols[Math.floor(Math.random() * 16)];
  }
  return color;
}

export abstract class Emitter {
  public operator?: Operator;
  public previousEmitter?: Emitter;
  public belongsToOperator?: Operator;
  y: WritableSignal<number> = signal(0);
  x: WritableSignal<number> = signal(0);
  width = 90;
  destroyed$: Subject<void> = new Subject<void>();
  color = getRandomColor();
  isStartEmitter?: boolean;
  public id: number = IDGenerator.getID();
  public type: string = '';

  public valueType: string = 'unknown';

  hot = signal(false);
  isHot: WritableSignal<boolean> = signal(false);

  onItem?: (item: Item) => void;

  private _property1: any;
  public get property1(): any {
    return this._property1;
  }
  public set property1(value: any) {
    this._property1 = value;
    this.property1$.next(value);
  }

  property1$: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  constructor() {}

  abstract activate(obs?: Observable<any>): void;

  destroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
