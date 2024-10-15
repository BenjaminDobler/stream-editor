import {
  BehaviorSubject,
  interval,
  Observable,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { Item } from './item';
import { Operator } from './operators/base.operator';
import { Signal, signal, WritableSignal } from '@angular/core';

function getRandomColor() {
  var symbols = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += symbols[Math.floor(Math.random() * 16)];
  }
  return color;
}

export class Emitter {
  public operator?: Operator;
  public belongsToOperator?: Operator;
  y: WritableSignal<number> = signal(0);
  x: WritableSignal<number> = signal(0);
  width = 40;
  destroyed$: Subject<void> = new Subject<void>();
  color = getRandomColor();
  isStartEmitter?: boolean;

  private _property1: any;
  public get property1(): any {
    return this._property1;
  }
  public set property1(value: any) {
    this._property1 = value;
    this.property1$.next(value);
  }

  property1$: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  constructor(
    public id: number,
    private onItem: any,
    public type: 'interval' | 'click' | 'observable',
    public index: number,
  ) {
    console.log('COLOR ', this.color);

    if (this.type === 'interval') {
      this.property1 = 2000;
    }
  }

  activate(obs?: Observable<any>) {
    if (this.type === 'click') {
      const item = new Item();
      item.y.update(() => this.y() + 10);
      item.colors = [this.color];
      this.onItem(item);
    } else if (this.type === 'interval') {
      this.property1$
        .pipe(
          switchMap((p) => interval(p)),
          takeUntil(this.destroyed$),
        )
        .subscribe(() => {
          const item = new Item();
          item.colors = [this.color];
          item.y.update(() => this.y() + 10);
          this.onItem(item);
        });
    } else if (this.type === 'observable') {
      obs?.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
        let colors = [];
        if (Array.isArray(data)) {
          colors = data.reduce((prev, curr) => {
            return [...prev, ...curr.colors];
          }, []);
        } else {
          colors = data.colors;
        }

        const item = new Item();
        item.y.update(() => this.y() + 10);
        item.x.update(() => this.x());
        item.emitterID = this.id;
        item.colors = colors;
        this.onItem(item);
      });
    }
  }

  destroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
