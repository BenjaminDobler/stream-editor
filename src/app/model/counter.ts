import { Item } from './item';

export class Counter {
  x = 0;
  y = 0;
  width = 200;
  height = 200;
  count = 0;

  impactedMap: Map<string, boolean> = new Map<string, boolean>();

  impact(item: Item) {
    if (!this.impactedMap.has(item.id + '')) {
      this.impactedMap.set(item.id + '', true);
      this.count++;
    }
  }
}
