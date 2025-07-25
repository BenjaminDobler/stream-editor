import { BehaviorSubject, filter, map, reduce, scan, Subject, switchMap, throttleTime } from 'rxjs';
import { Operator } from './base.operator';
import { Emitter } from '../emitter/emitter';
import { ObservableEmitter } from '../emitter/observable.emitter';
import { Item } from '../item';
import { signal, WritableSignal } from '@angular/core';

export class ScanOperator extends Operator {
  override type = 'scan';
  protected override _value1: any = '';
  override width: WritableSignal<number> = signal(60);

  impact(item: any) {
    if (this.inputEmitterObservables.hasOwnProperty(item.emitterID)) {
      this.inputEmitterObservables[item.emitterID].source.next(item);
    }
  }

  init() { }

  reset() { }

  getCode() {
    return `scan((acc, curr, index) => {
      return ${this.value1}
    })`;
  }

  filterFunction: any;

  //input emitters
  setInputEmitters(e: Emitter[]) {
    let hasNewEmitters = false;
    e.forEach((e) => {
      if (!this.inputEmitterObservables.hasOwnProperty(e.id)) {
        hasNewEmitters = true;
        const emitter = new ObservableEmitter();
        emitter.belongsToOperator = this;
        emitter.color = e.color;
        emitter.previousEmitter = e;
        emitter.valueType = e.valueType;

        const source: Subject<Item> = new Subject<Item>();
        emitter.x.update(() => this.x() + this.width() + 2);
        emitter.y.update(() => e.y());
        emitter.width = 10;
        this.app.addEmitter(emitter);
        this.inputEmitterObservables[e.id] = {
          source,
          observable: this.value1$.pipe(
            map((filterFunctionString) => {
              let filterFunction: any = () => true;
              try {
                const body = 'function(acc, curr, index ){ return ' + filterFunctionString + ' }';
                const wrap = (s: any) => '{ return ' + body + ' };'; //return the block having function expression
                filterFunction = new Function(wrap(body));
              } catch (e) {
                // console.log('error creating filter function');
              }
              return filterFunction;
            }),
            switchMap((t) =>
              source.asObservable().pipe(
                scan((acc, item: Item, index: number) => {
                  // TODO: implement actual filter function
                  console.log('reduce acc', acc);
                  console.log('reduce item', item);
                  console.log('reduce index', index);

                  let res: any = item;
                  try {
                    res = t.call(null).call(null, acc.value, item.value, index);
                  } catch (e) {
                    console.log('error in reduce function', e);
                   }

                  console.log('reduce res', res);
                  item.value = res;
                  return item as any;
                  // return true;
                },{value: 0}),
              ),
            ),
          ),
          emitter: emitter,
          sourceEmitter: e,
        };
        emitter.activate(this.inputEmitterObservables[e.id].observable);
      }
    });

    const toRemove = Object.keys(this.inputEmitterObservables).filter((k) => !e.find((em) => em.id === +k));

    toRemove.forEach((k) => {
      const val = this.inputEmitterObservables[k];
      this.app.emitters.update((emitters) => emitters.filter((e) => e !== val.emitter));
      this.inputEmitterObservables[k].emitter.destroy();
      delete this.inputEmitterObservables[k];
    });

    if (hasNewEmitters) {
      this.app.updateOperatorInputs();
    }
    Object.keys(this.inputEmitterObservables).forEach((k) => {
      const inp = this.inputEmitterObservables[k];
      if (inp.emitter) {
        inp.emitter.x.update(() => this.x() + this.width() + 2);
        inp.emitter.y.update(() => inp.sourceEmitter.y());
      }
    });
  }
}
