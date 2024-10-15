import {
  Subject,
} from 'rxjs';
import { Emitter } from '../emitter';
import { AppComponent } from '../../app.component';

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
  private _x = 0;
  public get x() {
    return this._x;
  }
  public set x(value) {
    this._x = value;
    this.app.updateOperatorInputs();
  }
  private _y = 0;
  public get y() {
    return this._y;
  }
  public set y(value) {
    this._y = value;
    this.app.updateOperatorInputs();
  }

  width = 100;
  private _height = 200;
  public get height() {
    return this._height;
  }
  public set height(value) {
    this._height = value;
    this.app.updateOperatorInputs();
  }

  items: Subject<any> = new Subject<any>();

  inputEmitterObservables: any = {};

  abstract init(): void;

  abstract impact(item: any): void;

  //input emitters
  abstract setEmitters(e: Emitter[]): void;

  constructor(
    protected onItem: any,
    protected app: AppComponent,
    type: 'combine' | 'throttle' | 'merge' = 'throttle',
  ) {
    this.init();
  }
}
