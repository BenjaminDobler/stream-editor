import { filter, interval, Observable, switchMap, takeUntil } from 'rxjs';
import { Emitter } from './emitter';
import { Item } from '../item';

export class NumberEmitter extends Emitter {
  override type = 'number';

  constructor() {
    super();
    this.property1 = 0;
    this.activate();
  }

  override activate(obs?: Observable<any>): void {
    console.log('number emitter activated');
    this.property1$
      .pipe(
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
