import { filter, interval, Observable, switchMap, takeUntil } from 'rxjs';
import { Emitter } from './emitter';
import { Item } from '../item';

export class IntervalEmitter extends Emitter {
  override type = 'interval';

  constructor() {
    super();
    this.property1 = 2000;
    this.activate();
  }

  override activate(obs?: Observable<any>): void {
    this.property1$
      .pipe(
        switchMap((p) => interval(p).pipe(filter((x) => this.hot()))),
        takeUntil(this.destroyed$),
      )
      .subscribe((count) => {
        const item = new Item();
        item.colors = [this.color];
        item.value = count;
        item.y.update(() => this.y());
        item.x.update(() => this.x() + this.width);
        if (this.onItem) {
          this.onItem(item);
        }
      });
  }
}
