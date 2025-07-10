import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { Emitter } from '../emitter/emitter';
import { toObservable } from '@angular/core/rxjs-interop';

import { Injector, runInInjectionContext, signal, WritableSignal } from '@angular/core';
import { IDGenerator } from '../../it.generator';
import { StreamVizComponent } from '../../stream-viz.component';

export abstract class Operator {
  count = signal(0);

  protected _value1: any = 2000;
  public get value1() {
    return this._value1;
  }
  public set value1(value) {
    this._value1 = value;
    this.value1$.next(value);
  }

  dragging = signal<boolean>(false);

  value1$ = new BehaviorSubject<number>(this._value1);

  public type = 'unknown';

  public id: number = IDGenerator.getID();

  x: WritableSignal<number> = signal(0);
  y: WritableSignal<number> = signal(0);
  width: WritableSignal<number> = signal(100);
  height: WritableSignal<number> = signal(200);

  setHeight(value: number) {
    this.height.set(value);
  }

  setWidth(value: number) {
    this.width.set(value);
  }

  setPos(data: { x: number; y: number }) {
    this.x.set(data.x);
    this.y.set(data.y);
  }

  items: Subject<any> = new Subject<any>();

  inputEmitterObservables: any = {};

  abstract init(): void;

  abstract impact(item: any): void;

  completed: WritableSignal<boolean> = signal(false);

  public emit$: Subject<any> = new Subject<any>();

  abstract reset(): void;

  abstract getCode(): string;
  //input emitters
  abstract setInputEmitters(e: Emitter[]): void;

  constructor(
    protected app: StreamVizComponent,
    protected injector: Injector,
  ) {
    this.init();

    // TODO: can we throttle this?
    runInInjectionContext(this.injector, () => {
      combineLatest([
        toObservable(this.x),
        toObservable(this.y),
        toObservable(this.width),
        toObservable(this.height),
      ]).subscribe((data) => {
        this.app.updateOperatorInputs();
      });
    });
  }
}
