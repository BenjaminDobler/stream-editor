import { signal } from '@angular/core';
import { IDGenerator } from '../it.generator';

export class Item {
  x = signal(0);
  y = signal(0);
  width = signal(0);
  height = signal(0);
  speed = 2;
  id = IDGenerator.getID();

  value?: any;

  emitterID = 0;
  colors = ['#00ff00'];

  update() {
    this.x.update((value) => value + this.speed);
  }
}
