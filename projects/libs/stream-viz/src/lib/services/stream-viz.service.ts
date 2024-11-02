import { Injectable, signal, WritableSignal } from '@angular/core';
import { CombineLatestOperator } from '../model/operators/combineLatest.operator';
import { MergeOperator } from '../model/operators/merge.operator';
import { SkipOperator } from '../model/operators/skip.operator';
import { ThrottleOperator } from '../model/operators/throttle.operator';
import { DebounceOperator } from '../model/operators/debounce.operator';
import { ConsumerOperator } from '../model/operators/consumer.operator';
import { Emitter } from '../model/emitter/emitter';
import { ClickEmitter } from '../model/emitter/click.emitter';
import { IntervalEmitter } from '../model/emitter/interval.emitter';
import { TakeUntilOperator } from '../model/operators/takeuntil.operator';
import { SwitchMapToOperator } from '../model/operators/switchMapTo.operator';
import { TakeOperator } from '../model/operators/take.operator';
import { FilterOperator } from '../model/operators/filter.operator';
import { PairwiseOperator } from '../model/operators/pairwise.operator';
import { MapOperator } from '../model/operators/map.operator';

export interface OperatorDescription {
  implementation: any;
  name: string;
}

export interface EmitterDescription {
  implementation?: any;
  implementationFactory?: () => Emitter;
  name: string;
  valueType: string;
  metadata?: string;
}

@Injectable({
  providedIn: 'root',
})
export class StreamVizService {

  public types: string = '';
  operators: WritableSignal<OperatorDescription[]> = signal([
    { implementation: CombineLatestOperator, name: 'combineLatest' },
    { implementation: MergeOperator, name: 'merge' },
    { implementation: SkipOperator, name: 'skip' },
    { implementation: ThrottleOperator, name: 'throttle' },
    { implementation: DebounceOperator, name: 'debounce' },
    { implementation: TakeUntilOperator, name: 'takeUntil' },
    { implementation: SwitchMapToOperator, name: 'switchMapTo' },
    { implementation: FilterOperator, name: 'filter' },
    { implementation: TakeOperator, name: 'take' },
    { implementation: PairwiseOperator, name: 'pairwise' },
    { implementation: MapOperator, name: 'map' },
    { implementation: ConsumerOperator, name: 'consumer' },
  ]);

  emitters: WritableSignal<EmitterDescription[]> = signal([
    { implementation: ClickEmitter, name: 'click', valueType: 'number' },
    { implementation: IntervalEmitter, name: 'interval', valueType: 'number' },
  ]);

  addEmitter(description: EmitterDescription) {
    this.emitters.update((x) => [...x, description]);
  }

  addTypes(types: string) {
    this.types += types + '\n';
  }
}
