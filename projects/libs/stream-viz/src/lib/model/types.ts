import { WritableSignal } from "@angular/core";

export interface SignalObject {
  x: WritableSignal<number>;
  y: WritableSignal<number>;
  width: WritableSignal<number>;
  height: WritableSignal<number>;
}
