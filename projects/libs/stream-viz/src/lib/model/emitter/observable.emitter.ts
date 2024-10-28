import { filter, Observable, takeUntil } from 'rxjs';
import { Emitter } from './emitter';
import { Item } from '../item';

export class ObservableEmitter extends Emitter {
  override type = 'observable';


  override activate(obs?: Observable<any>): void {
    obs?.pipe(filter(x=>this.hot()), takeUntil(this.destroyed$)).subscribe((data) => {
      let colors = [];
      let value;
      if (Array.isArray(data)) {
        colors = data.reduce((prev, curr) => {
          return [...prev, ...curr.colors];
        }, []);
      } else {
        colors = data.colors;
      }

      if (Array.isArray(data)) {
        value = data.map((item) => item.value);
      } else {
        value = data.value;
      }

      const item = new Item();
      item.y.update(() => this.y() + 10);
      item.x.update(()=>this.x() + this.width);

      item.emitterID = this.id;
      item.value = value;
      item.colors = colors;
      if (this.onItem) {
        this.onItem(item);
      }
    });
  }
}
