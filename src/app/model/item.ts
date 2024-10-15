import { signal } from '@angular/core';

export class Item {
  x = signal(0);
  y = signal(0);
  id = 0;
  emitterID = 0;
  colors = ['#00ff00'];

  update() {
    this.x.update((value) => value + 4);
  }
}
