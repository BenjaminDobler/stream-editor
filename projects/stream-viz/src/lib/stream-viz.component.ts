import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EnvironmentInjector,
  inject,
  signal,
  viewChild,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Item } from './model/item';

import { DraggerDirective } from '@richapps/rx-drag';
import { Counter } from './model/counter';
import { ContextMenu, ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { Operator } from './model/operators/base.operator';
import { Emitter } from './model/emitter/emitter';
import * as PIXI from 'pixi.js';
import { DropdownModule } from 'primeng/dropdown';

import { EmitterDescription, OperatorDescription, StreamVizService } from './services/stream-viz.service';
import { TakeUntilOperator } from './model/operators/takeuntil.operator';
import { TakeUntilOperatorTarget } from './model/operators/takeuntil-target.operator';
import { SwitchMapToOperator } from './model/operators/switchMapTo.operator';
import { fromEvent, take, takeUntil } from 'rxjs';
import { SwitchMapToOperatorTarget } from './model/operators/switchMapToTarget.operator';
import { SignalObject } from './model/types';
import { Tap } from './model/tap';

@Component({
  selector: 'stream-viz',
  standalone: true,
  imports: [RouterOutlet, FormsModule, DraggerDirective, ContextMenuModule, DropdownModule],
  providers: [StreamVizComponent],
  templateUrl: './stream-viz.component.html',
  styleUrl: './stream-viz.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamVizComponent {
  @ViewChild('contextMenu') contextMenu?: ContextMenu;

  pixiElement = viewChild<ElementRef>('pixi');

  public streamVizService: StreamVizService = inject(StreamVizService);

  counters: WritableSignal<Counter[]> = signal<Counter[]>([]);
  taps: WritableSignal<Tap[]> = signal<Tap[]>([]);

  rightClickEmitter?: Emitter;
  rightClickOperator?: Operator;

  backgroundColor: string = '#00ff00';

  constructor(private injector: EnvironmentInjector) {}

  emitterContextMenuItems: MenuItem[] = [
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: (e) => {
        this.emitters.update((emitters) => emitters.filter((e) => e !== this.rightClickEmitter));
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
        this.operators.update((x) => x.filter((e) => e !== this.rightClickOperator));
        const obstacleEmitters = this.emitters().filter((e) => e.belongsToOperator === this.rightClickOperator);

        this.emitters.update((emitters) => emitters.filter((e) => e.belongsToOperator !== this.rightClickOperator));
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

  operators: WritableSignal<Operator[]> = signal([]);

  itemSpriteMap: Map<any, any> = new Map();
  app?: PIXI.Application;

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
    const computedStyles = getComputedStyle(document.body);
    this.backgroundColor = computedStyles.getPropertyValue('--background-color');
    this.initPixi();
  }

  onEmitterSelected(e: any) {
    console.log(e);
  }

  async initPixi() {
    const app = new PIXI.Application();
    this.app = app;
    await app.init({ width: 1400, height: 360, background: this.backgroundColor, backgroundAlpha: 0 });
    this.pixiElement()?.nativeElement.appendChild(app.canvas);

    let elapsed = 0.0;
    app.ticker.add((ticker) => {
      // elapsed += ticker.deltaTime;
      //sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
      this.checkCollision();
    });
  }

  checkCollision() {
    this.items().forEach((i) => i.update());

    this.items().forEach((item) => {
      const sprite = this.itemSpriteMap.get(item);
      sprite.position.set(item.x(), item.y());
    });

    const isColliding = (o1: SignalObject, o2: SignalObject) => {
      return o1.x() > o2.x() && o1.x() < o2.x() + o2.width() && o1.y() >= o2.y() && o1.y() < o2.y() + o2.height();
    };

    const toRemove: any = [];
    this.items().forEach((item) => {
      const counterCollision = this.counters().find((o) => isColliding(item, o));

      if (counterCollision) {
        counterCollision.impact(item);
      }

      const tapCollision = this.taps().find((o) => isColliding(item, o));

      if (tapCollision) {
        tapCollision.impact(item);
      }

      const collision = this.operators().find((o) => isColliding(item, o));

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
    this.items.update((items) => items.filter((item) => !toRemove.includes(item)));

    toRemove.forEach((item: Item) => {
      const sprite = this.itemSpriteMap.get(item);
      this.app?.stage.removeChild(sprite);
    });
  }

  connections: WritableSignal<any[]> = signal<any[]>([]);

  updateOperatorInputs() {
    this.operators.update((x) =>
      x.sort((a: Operator, b: Operator) => {
        return a.x() - b.x();
      }),
    );

    this.emitters().forEach((e) => {
      const emitterY = e.y() + 10;
      const emitteroperators = this.operators().filter((o) => {
        const isWithin = emitterY >= o.y() && emitterY <= o.y() + o.height() && e.x() < o.x();
        return isWithin;
      });
      e.operator = emitteroperators[0]; // sort by x first
    });

    const takeUntilOperatorsWithTarget = this.operators().filter(
      (o) => o.type === 'takeuntil' && (o as TakeUntilOperator).takeUntilTarget,
    );

    const switchMapOperatorsWithTarget = this.operators().filter(
      (o) => o.type === 'switchMapTo' && (o as SwitchMapToOperator).switchMapToTarget,
    );

    const cons: any = [];

    this.operators().forEach((o) => {
      const emitters = this.emitters().filter((e) => e.operator === o);
      o.setInputEmitters(emitters);
    });

    this.getOperatorLines();

    this.operators().forEach((o) => {
      const emitters = this.emitters().filter((e) => e.operator === o);
      o.setInputEmitters(emitters);

      emitters.forEach((e) => {
        const dash = e.hot() ? 'none' : '4';
        cons.push({ from: { x: e.x() + e.width + 15, y: e.y() + 10 }, to: { x: o.x() - 10, y: e.y() + 10 }, dash });
      });
    });

    takeUntilOperatorsWithTarget.forEach((o) => {
      const source = o;
      const destination = (o as TakeUntilOperator).takeUntilTarget;
      cons.push({
        from: {
          x: source.x(),
          y: source.y(),
        },
        to: {
          x: destination?.x(),
          y: destination?.y(),
        },
      });
    });

    this.connections.update(() => cons);

    switchMapOperatorsWithTarget.forEach((o) => {
      const source = o;
      const destination = (o as SwitchMapToOperator).switchMapToTarget;
      cons.push({
        from: {
          x: source.x(),
          y: source.y(),
        },
        to: {
          x: destination?.x(),
          y: destination?.y(),
        },
      });
    });
  }

  addItem(item: Item) {
    let sprite = new PIXI.Graphics();

    if (item.colors.length === 1) {
      sprite.circle(0, 0, 10).fill(item.colors[0]);
    } else {
      const partHeight = 20 / item.colors.length;
      item.colors.forEach((c, index) => {
        sprite.rect(0, -10 + index * partHeight, 20, partHeight).fill(c);
      });
    }
    sprite.position.set(item.x(), item.y());
    if (this.app) {
      this.app.stage.addChild(sprite);
    }
    this.itemSpriteMap.set(item, sprite);

    // Add it to the stage to render

    this.items.update((items) => [...items, item]);
  }

  updateRootEmitterPosition() {
    this.emitters()
      .filter((e) => !e.belongsToOperator)
      .forEach((emitter, index) => {
        emitter.y.update(() => 50 + index * 40);
      });
  }

  addEmitterFromDescription(emitterDescription: EmitterDescription) {
    if (!emitterDescription) {
      return;
    }
    const emitter: Emitter = emitterDescription.hasOwnProperty('implementation')
      ? new emitterDescription.implementation()
      : emitterDescription.implementationFactory && emitterDescription.implementationFactory();

    emitter.onItem = (item: Item) => {
      item.x.update(() => 10);
      item.emitterID = emitter.id;
      this.addItem(item);
    };
    emitter.isStartEmitter = true;
    this.emitters.update((emitters) => [...emitters, emitter]);

    this.updateOperatorInputs();
    this.updateRootEmitterPosition();
  }

  addCounter() {
    this.counters.update((x) => [...x, new Counter()]);
  }

  addTap() {
    this.taps.update((x) => [...x, new Tap()]);
  }

  addOperator(operatorDescription: OperatorDescription, event?: MouseEvent) {
    console.log('add operator ', operatorDescription);
    const o = new operatorDescription.implementation(this, this.injector) as Operator;
    console.log(o);
    // TODO: unsubscribe when deleted
    o.emit$.subscribe((item: Item) => {
      this.items.update((items) => [...items, item]);
    });

    if (event) {
      o.x.update(() => event.clientX);
      o.y.update(() => event.clientY);
      o.height.update(() => 50);

      const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
      const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup');

      mousemove$.pipe(takeUntil(mouseup$.pipe(take(1)))).subscribe((me) => {
        o.x.update(() => me.clientX);
        o.y.update(() => me.clientY);
      });
    } else {
      o.x.update(() => 200);
    }

    this.operators.update((ops) => [...ops, o]);

    this.updateOperatorInputs();
    return o;
  }

  addEmitter(emitter: Emitter) {
    emitter.onItem = (item: Item) => {
      item.emitterID = emitter.id;
      this.addItem(item);
    };
    this.emitters.update((emitters) => [...emitters, emitter]);
  }

  getOperatorLines() {
    const startTime = Date.now();
    const startEmitters = this.emitters().filter((e) => e.isStartEmitter);

    this.emitters().forEach((e) => e.hot.update(() => false));

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
          const operatorEmitters = this.emitters().filter((e) => e.belongsToOperator === currentEmitter?.operator);
          if (operatorEmitters.length === 1) {
            currentEmitter = operatorEmitters[0];
          } else {
            currentEmitter = operatorEmitters.find((e) => e.previousEmitter === currentEmitter);
          }
        }
      }

      let untilTriggered = operators.find((o: any) => o.triggered && o.type === 'takeUntilTarget');
      if (untilTriggered) {
        console.log('was trigerred!!!!!!!!');
      }
      let hasUntilTriggerTarget = operators.find((o: any) => o.type === 'takeuntiltarget');
      let hasSwitchMapTarget = operators.find((o: any) => o.type === 'switchMapToTarget') as SwitchMapToOperatorTarget;

      if (emittersInLine.length === 0) {
        emittersInLine = [emitterToCheck];
      }

      const hasActiveSwitchMapTarget = hasSwitchMapTarget && hasSwitchMapTarget.isActive;

      if (
        hasUntilTriggerTarget ||
        hasActiveSwitchMapTarget ||
        (!untilTriggered && operators.length > 0 && operators[operators.length - 1].type === 'consumer')
      ) {
        emitterToCheck.isHot.update((s) => true);
        emittersInLine.forEach((e) => e.hot.update(() => true));
      } else {
        emitterToCheck.isHot.update((s) => false);

        emittersInLine.forEach((e) => e.hot.update(() => false));
      }
    });

    console.log('took ', Date.now() - startTime);
  }

  save() {
    const emitters = this.emitters()
      .filter((e) => e.isStartEmitter)
      .map((e) => {
        return {
          type: e.type,
        };
      });

    const operators = this.operators().map((o) => {
      return {
        type: o.type,
        x: o.x(),
        y: o.y(),
        width: o.width(),
        height: o.height(),
        value1: o.value1
      };
    });

    const counters = this.counters().map((c) => {
      return {
        x: c.x(),
        y: c.y(),
        width: c.width(),
        height: c.height(),
      };
    });

    localStorage.setItem(
      'stored',
      JSON.stringify({
        operators,
        emitters,
        counters,
      }),
    );
  }

  restore() {
    const storedString = localStorage.getItem('stored');
    if (storedString) {
      const stored = JSON.parse(storedString);

      stored.emitters.forEach((e: any) => {
        const emitterDescription = this.streamVizService.emitters().find((d) => d.name === e.type);
        if (emitterDescription) {
          this.addEmitterFromDescription(emitterDescription);
        }
      });

      stored.operators.forEach((o: any) => {
        const operatorDescription = this.streamVizService.operators().find((d) => d.name === o.type);
        if (operatorDescription) {
          const operator = this.addOperator(operatorDescription);
          operator.x.update(() => o.x);
          operator.y.update(() => o.y);
          operator.width.update(() => o.width);
          operator.height.update(() => o.height);
          operator.value1 = o.value1;
        }
      });

      const newCouters = stored.counters.map((co: any) => {
        const c = new Counter();
        c.height.update(() => co.height);
        c.width.update(() => co.width);
        c.x.update(() => co.x);
        c.y.update(() => co.y);
        return c;
      });

      this.counters.update(() => newCouters);
    }
    this.updateOperatorInputs();
  }

  reset() {
    this.counters.update(() => []);
    this.emitters.update(() => []);
    this.operators.update(() => []);
    this.updateOperatorInputs();
  }
}
