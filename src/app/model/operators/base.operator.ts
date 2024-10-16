import { combineLatest, Subject } from 'rxjs';
import { Emitter } from '../emitter';
import { AppComponent } from '../../app.component';
import { toObservable } from '@angular/core/rxjs-interop';

import {
  effect,
  Injector,
  runInInjectionContext,
  signal,
  WritableSignal,
} from '@angular/core';
import { IDGenerator } from '../../it.generator';

export abstract class Operator {
  count = 0;
  protected _throttleTime = 2000;
  public get throttleTime(): number {
    return this._throttleTime;
  }
  public set throttleTime(value: number) {
    this._throttleTime = value;
  }
  public type = 'unknown';

  public id: number = IDGenerator.getID();


  x: WritableSignal<number> = signal(0);
  y: WritableSignal<number> = signal(0);
  width: WritableSignal<number> = signal(100);
  height: WritableSignal<number> = signal(200);

  items: Subject<any> = new Subject<any>();

  inputEmitterObservables: any = {};

  abstract init(): void;

  abstract impact(item: any): void;

  //input emitters
  abstract setEmitters(e: Emitter[]): void;

  constructor(
    protected onItem: any,
    protected app: AppComponent,
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
