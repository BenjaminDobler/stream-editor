import { signal, WritableSignal } from '@angular/core';
import { Item } from './item';
import { IDGenerator } from '../it.generator';

export class Tap {
  x = signal(0);
  y = signal(0);
  width = signal(200);
  height = signal(200);

  currentItem: WritableSignal<Item | null> = signal(null);

  setHeight(value: number) {
    this.height.update(() => value);
  }

  setWidth(value: number) {
    this.width.update(() => value);
  }

  setPos(data: { x: number; y: number }) {
    this.x.update(() => data.x);
    this.y.update(() => data.y);
  }

  count = signal(0);
  public id: number = IDGenerator.getID();

  impactedMap: Map<string, boolean> = new Map<string, boolean>();

  impact(item: Item) {
    this.currentItem.update((x) => item);
    if (!this.impactedMap.has(item.id + '')) {
      this.impactedMap.set(item.id + '', true);
      this.count.update((x) => x + 1);
    }
  }
}
