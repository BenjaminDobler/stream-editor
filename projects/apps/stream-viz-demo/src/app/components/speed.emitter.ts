import { filter, interval, map, Observable } from 'rxjs';
import { Emitter, Item } from '@richapps/stream-viz';

export class SpeedEmitter extends Emitter {
  constructor(private source$: Observable<any>) {
    super();
    this.activate();
  }
  override activate(obs?: Observable<any>): void {
    this.source$.pipe(filter((x) => this.hot())).subscribe((data) => {
      console.log('on source data ');
      const item = new Item();
      item.y.update(() => this.y() + 10);
      item.x.update(() => this.x() + this.width);

      item.colors = [this.color];
      item.value = data;
      if (this.onItem) {
        this.onItem(item);
      }
    });
  }
}
