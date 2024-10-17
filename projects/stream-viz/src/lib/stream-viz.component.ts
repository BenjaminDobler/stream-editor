import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EnvironmentInjector,
  inject,
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
import { Emitter } from './model/emitter/emitter';

import {
  EmitterDescription,
  OperatorDescription,
  StreamVizService,
} from './services/stream-viz.service';
import { TakeUntilOperator } from './model/operators/takeuntil.operator';
import { TakeUntilOperatorTarget } from './model/operators/takeuntil-target.operator';
import { SwitchMapToOperator } from './model/operators/switchMapTo.operator';

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
  selector: 'stream-viz',
  standalone: true,
  imports: [RouterOutlet, FormsModule, DragableDirective, ContextMenuModule],
  providers: [StreamVizComponent],
  templateUrl: './stream-viz.component.html',
  styleUrl: './stream-viz.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamVizComponent {
  @ViewChild('contextMenu') contextMenu?: ContextMenu;

  public streamVizService: StreamVizService = inject(StreamVizService);

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

    const takeUntilOperatorsWithTarget = this.operators.filter(
      (o) => o.type === 'takeuntil' && (o as TakeUntilOperator).takeUntilTarget,
    );

    const switchMapOperatorsWithTarget = this.operators.filter(
      (o) => o.type === 'switchMapTo' && (o as SwitchMapToOperator).switchMapToTarget,
    );

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

    takeUntilOperatorsWithTarget.forEach((o) => {
      const source = o;
      const destination = (o as TakeUntilOperator).takeUntilTarget;
      ctx.moveTo(source.x(), source.y() + 0.1); // Move the pen to (30, 50)
      ctx.lineTo(destination?.x() || 0, (destination?.y() || 0) + 10 + 0.1); // Draw a line to (150, 100)
    });


    switchMapOperatorsWithTarget.forEach((o) => {
      const source = o;
      const destination = (o as SwitchMapToOperator).switchMapToTarget;
      ctx.moveTo(source.x(), source.y() + 0.1); // Move the pen to (30, 50)
      ctx.lineTo(destination?.x() || 0, (destination?.y() || 0) + 10 + 0.1); // Draw a line to (150, 100)
    });


    ctx.stroke(); // Render the path

    this.getOperatorLines();
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

  addEmitterFromDescription(emitterDescription: EmitterDescription) {
    const emitter = new emitterDescription.implementation();
    emitter.onItem = (item: Item) => {
      item.x.update(() => 10);
      item.emitterID = emitter.id;
      this.items.update((items) => [...items, item]);
    };
    emitter.isStartEmitter = true;
    this.emitters.update((emitters) => [...emitters, emitter]);

    this.updateOperatorInputs();
    this.updateRootEmitterPosition();
  }

  addCounter() {
    this.counters.push(new Counter());
  }

  addOperator(operatorDescription: OperatorDescription) {
    const o = new operatorDescription.implementation(this, this.injector);
    o.emit$.subscribe((item: Item) => {
      this.items.update((items) => [...items, item]);
    });
    o.x.update(() => 200);
    this.operators.push(o);

    this.updateOperatorInputs();
    return o;
  }

  addEmitter(emitter: Emitter) {
    emitter.onItem = (item: Item) => {
      item.emitterID = emitter.id;
      this.items.update((items) => [...items, item]);
    };
    this.emitters.update((emitters) => [...emitters, emitter]);
  }

  getOperatorLines() {
    const startEmitters = this.emitters().filter((e) => e.isStartEmitter);

    startEmitters.forEach((emitterToCheck) => {
      let emittersInLine = [];
      let currentEmitter: Emitter | undefined = emitterToCheck;
      const operators = [];
      while (currentEmitter && currentEmitter.operator) {
        emittersInLine.push(currentEmitter);
        if (currentEmitter.operator) {
          operators.push(currentEmitter.operator);
        }
        if (currentEmitter) {
          const operatorEmitters = this.emitters().filter(
            (e) => e.belongsToOperator === currentEmitter?.operator,
          );
          if (operatorEmitters.length === 1) {
            currentEmitter = operatorEmitters[0];
          } else {
            currentEmitter = operatorEmitters.find(
              (e) => e.previousEmitter === currentEmitter,
            );
          }
        }
      }

      let untilTriggered = operators.find((o: any) => o.triggered);
      if (untilTriggered) {
        console.log('was trigerred!!!!!!!!');
      }
      let hatUntilTriggerTarget = operators.find(
        (o: any) => o.type === 'takeuntiltarget',
      );

      if (emittersInLine.length === 0) {
        emittersInLine = [emitterToCheck];
      }
      if (
        hatUntilTriggerTarget ||
        (!untilTriggered &&
          operators.length > 0 &&
          operators[operators.length - 1].type === 'consumer')
      ) {
        emitterToCheck.isHot.update((s) => true);
        emittersInLine.forEach((e) => e.hot.update(() => true));
      } else {
        emitterToCheck.isHot.update((s) => false);

        emittersInLine.forEach((e) => e.hot.update(() => false));
      }
    });
  }
}
