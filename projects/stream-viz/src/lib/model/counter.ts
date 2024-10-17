import { signal } from '@angular/core';
import { Item } from './item';
import { IDGenerator } from '../it.generator';

export class Counter {
  x = signal(0);
  y = signal(0);
  width = signal(200);
  height = signal(200);
  count = signal(0);
  public id: number = IDGenerator.getID();

  impactedMap: Map<string, boolean> = new Map<string, boolean>();

  impact(item: Item) {
    if (!this.impactedMap.has(item.id + '')) {
      this.impactedMap.set(item.id + '', true);
      this.count.update((x) => x + 1);
    }
  }
}
