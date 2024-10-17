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
      item.y.update(() => this.y() + 10);
      item.colors = [this.color];
      item.value = this.count;
      if (this.onItem) {
        this.onItem(item);
      }
      this.count++;
    }
  }
}
