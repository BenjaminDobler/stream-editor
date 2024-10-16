import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EnvironmentInjector,
  Injector,
  runInInjectionContext,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Item } from './model/item';

import { DragableDirective } from './dragable.directive';
import { Counter } from './model/counter';
import { ContextMenu, ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { Operator } from './model/operators/base.operator';
import { Emitter } from './model/emitter';
import { ThrottleOperator } from './model/operators/throttle.operator';
import { DebounceOperator } from './model/operators/debounce.operator';
import { SkipOperator } from './model/operators/skip.operator';
import { CombineLatestOperator } from './model/operators/combineLatest.operator';
import { MergeOperator } from './model/operators/merge.operator';
import { ConsumerOperator } from './model/operators/consumer.operator';

function FpsCtrl(fps: number, callback: any) {
  var delay = 1000 / fps, // calc. time per frame
    time: any = null, // start time
    frame = -1, // frame count
    tref; // rAF time reference

  function loop(timestamp: any) {
    if (time === null) time = timestamp; // init start time
    var seg = Math.floor((timestamp - time) / delay); // calc frame no.
    if (seg > frame) {
      // moved to next frame?
      frame = seg; // update
      callback({
        // callback function
        time: timestamp,
        frame: frame,
      });
    }
    tref = requestAnimationFrame(loop);
  }
  loop(0);
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, DragableDirective, ContextMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'line-animation';

  @ViewChild('contextMenu') contextMenu?: ContextMenu;

  @ViewChild('canvas')
  canvas?: ElementRef<HTMLCanvasElement>;
  context?: CanvasRenderingContext2D;
  counters: Counter[] = [];

  rightClickEmitter?: Emitter;
  rightClickOperator?: Operator;

  constructor(private injector: EnvironmentInjector) {}

  emitterContextMenuItems: MenuItem[] = [
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: (e) => {
        this.emitters.update((emitters) =>
          emitters.filter((e) => e !== this.rightClickEmitter),
        );
        this.rightClickEmitter?.destroy();
        this.updateRootEmitterPosition();
        this.updateOperatorInputs();
      },
    },
  ];

  obstacleContextMenuItems: MenuItem[] = [
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: (e) => {
        this.operators = this.operators.filter(
          (e) => e !== this.rightClickOperator,
        );

        const obstacleEmitters = this.emitters().filter(
          (e) => e.belongsToOperator === this.rightClickOperator,
        );

        this.emitters.update((emitters) =>
          emitters.filter(
            (e) => e.belongsToOperator !== this.rightClickOperator,
          ),
        );
        obstacleEmitters.forEach((e) => e.destroy());
        this.updateOperatorInputs();
      },
    },
  ];

  dasharray = 20;
  offset = 0;

  selectedOperator?: Operator;

  items: WritableSignal<Item[]> = signal([]);
  emitters: WritableSignal<Emitter[]> = signal([]);

  operators: Operator[] = [];

  onEmitterContextMenu(event: any, emitter: Emitter) {
    this.rightClickEmitter = emitter;
    if (this.contextMenu) {
      this.contextMenu.model = this.emitterContextMenuItems;
      this.contextMenu.target = event.currentTarget;
      this.contextMenu.show(event);
    }
  }

  onObstacleContextMenu(event: any, operator: Operator) {
    this.rightClickOperator = operator;

    if (this.contextMenu) {
      this.contextMenu.model = this.obstacleContextMenuItems;
      this.contextMenu.target = event.currentTarget;
      this.contextMenu.show(event);
    }
  }

  ngAfterViewInit(): void {
    if (this.canvas) {
      this.context = this.canvas.nativeElement.getContext(
        '2d',
      ) as CanvasRenderingContext2D;
    } else {
      console.log('no canvas');
    }
  }
  start() {
    const fps = FpsCtrl(30, (data: any) => {
      // console.log('update ', this.items);
      //console.log('loop ', data)
      this.items().forEach((i) => i.update());

      const toRemove: any = [];
      this.items().forEach((item) => {
        const counterCollision = this.counters.find(
          (o) =>
            item.x() > o.x() &&
            item.x() < o.x() + o.width() &&
            item.y() >= o.y() &&
            item.y() < o.y() + o.height(),
        );

        if (counterCollision) {
          counterCollision.impact(item);
        }

        const collision = this.operators.find(
          (o) =>
            item.x() > o.x() &&
            item.x() < o.x() + o.width() &&
            item.y() >= o.y() &&
            item.y() < o.y() + o.height(),
        );
        if (collision) {
          toRemove.push(item);
          collision.impact(item);
        } else {
          if (item.x() > 1200) {
            // dead out of game
            toRemove.push(item);
          }
        }
      });
      this.items.update((items) =>
        items.filter((item) => !toRemove.includes(item)),
      );
    });
  }

  updateOperatorInputs() {
    this.operators.sort((a: Operator, b: Operator) => {
      return a.x() - b.x();
    });
    this.emitters().forEach((e) => {
      const emitterY = e.y() + 10;
      const emitteroperators = this.operators.filter((o) => {
        const isWithin =
          emitterY >= o.y() && emitterY <= o.y() + o.height() && e.x() < o.x();
        return isWithin;
      });
      e.operator = emitteroperators[0]; // sort by x first
    });

    const ctx = this.context as CanvasRenderingContext2D;
    ctx.canvas.width = ctx.canvas.width;

    ctx.beginPath(); // Start a new path
    ctx.setLineDash([5, 5]);

    this.operators.forEach((o) => {
      const emitters = this.emitters().filter((e) => e.operator === o);
      o.setEmitters(emitters);

      emitters.forEach((e) => {
        {
          ctx.moveTo(e.x(), e.y() + 10 + 0.1); // Move the pen to (30, 50)
          ctx.lineTo(o.x(), e.y() + 10 + 0.1); // Draw a line to (150, 100)
        }
      });
    });
    ctx.stroke(); // Render the path
  }

  addItem() {
    const item = new Item();
    this.items.update((items) => [...items, item]);
  }

  updateRootEmitterPosition() {
    this.emitters()
      .filter((e) => !e.belongsToOperator)
      .forEach((emitter, index) => {
        emitter.y.update(() => index * 40);
      });
  }

  addEmitter(type: 'click' | 'interval') {
    const emitter = new Emitter(
      (item: Item) => {
        item.x.update(() => 10);
        item.emitterID = emitter.id;
        this.items.update((items) => [...items, item]);
      },
      type,
      this.emitters.length,
    );
    emitter.isStartEmitter = true;
    this.emitters.update((emitters) => [...emitters, emitter]);

    this.updateOperatorInputs();
    this.updateRootEmitterPosition();
  }

  addCounter() {
    this.counters.push(new Counter());
  }

  addObstacle(type: string) {
    if (type === 'throttle') {
      const o = new ThrottleOperator(
        (item: any) => {
          this.items.update((items) => [...items, item]);
        },
        this,
        this.injector,
      );
      o.x.update(() => 200);
      this.operators.push(o);
    } else if (type === 'debounce') {
      const debounce = new DebounceOperator(
        (item: any) => {
          this.items.update((items) => [...items, item]);
        },
        this,
        this.injector,
      );
      debounce.x.update(() => 200);
      this.operators.push(debounce);
    } else if (type === 'skip') {
      const skip = new SkipOperator(
        (item: any) => {
          this.items.update((items) => [...items, item]);
        },
        this,
        this.injector,
      );
      skip.x.update(() => 200);
      this.operators.push(skip);
    } else if (type === 'combineLatest') {
      const combineLatest = new CombineLatestOperator(
        (item: any) => {
          this.items.update((items) => [...items, item]);
          // this.updateObstacleInputs();
        },
        this,
        this.injector,
      );
      combineLatest.x.update(() => 400);
      combineLatest.height.update(() => 60);
      this.operators.push(combineLatest);
    } else if (type === 'merge') {
      const mergeObstacle = new MergeOperator(
        (item: any) => {
          this.items.update((items) => [...items, item]);

          // this.updateObstacleInputs();
        },
        this,
        this.injector,
      );
      mergeObstacle.x.update(() => 400);
      mergeObstacle.height.update(() => 60);
      this.operators.push(mergeObstacle);
    } else if (type === 'consumer') {
      const combineLatest = new ConsumerOperator(
        (item: any) => {
          this.items.update((items) => [...items, item]);

          // this.updateObstacleInputs();
        },
        this,
        this.injector,
      );
      combineLatest.x.update(() => 400);
      combineLatest.height.update(() => 60);
      this.operators.push(combineLatest);
    }

    this.updateOperatorInputs();
  }
}
