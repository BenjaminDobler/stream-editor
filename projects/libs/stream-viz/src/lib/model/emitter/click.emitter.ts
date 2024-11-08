import { Observable } from 'rxjs';
import { Emitter } from './emitter';
import { Item } from '../item';

export class ClickEmitter extends Emitter {
  override type = 'click';
  count = 0;

  constructor() {
    super();
  }

  override activate(obs?: Observable<any>): void {
    if (this.hot()) {
      const item = new Item();
      item.x.update(() => this.x() + this.width);
      item.y.update(() => this.y());
      item.colors = [this.color];
      item.value = this.count;
      if (this.onItem) {
        this.onItem(item);
      }
      this.count++;
    }
  }
}
