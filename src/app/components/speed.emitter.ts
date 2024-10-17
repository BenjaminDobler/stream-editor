import { filter, interval, map, Observable } from 'rxjs';
import { Emitter, Item } from 'stream-viz';

export class SpeedEmitter extends Emitter {
  override activate(obs?: Observable<any>): void {
    interval(200)
      .pipe(
        map((x) => Math.random() * 200),
        filter((x) => this.hot()),
      )

      .subscribe((val) => {
        const item = new Item();
        item.y.update(() => this.y() + 10);
        item.colors = [this.color];
        item.value = val;
        if (this.onItem) {
          this.onItem(item);
        }
      });
  }
}
