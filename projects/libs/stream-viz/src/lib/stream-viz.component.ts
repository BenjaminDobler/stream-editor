import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { SplitterModule } from 'primeng/splitter';

import { EmitterDescription, OperatorDescription, StreamVizService } from './services/stream-viz.service';
import { TakeUntilOperator } from './model/operators/takeuntil.operator';
import { TakeUntilOperatorTarget } from './model/operators/takeuntil-target.operator';
import { SwitchMapToOperator } from './model/operators/switchMapTo.operator';
import { fromEvent, take, takeUntil } from 'rxjs';
import { SwitchMapToOperatorTarget } from './model/operators/switchMapToTarget.operator';
import { SignalObject } from './model/types';
import { Tap } from './model/tap';
import { ConnectionsComponent } from './components/connections/connections.component';
import { OperatorComponent } from './components/operator/operator.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { JsonPipe } from '@angular/common';
import { SplitterComponent } from './components/splitter/splitter.component';
import { NgMonacoComponent } from '@richapps/ng-monaco';

@Component({
  selector: 'stream-viz',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    DraggerDirective,
    ContextMenuModule,
    DropdownModule,
    ConnectionsComponent,
    OperatorComponent,
    MonacoEditorModule,
    SplitterComponent,
    JsonPipe,
    NgMonacoComponent,
  ],
  providers: [StreamVizComponent],
  templateUrl: './stream-viz.component.html',
  styleUrl: './stream-viz.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamVizComponent {
  @ViewChild('contextMenu') contextMenu?: ContextMenu;

  pixiElement = viewChild<ElementRef>('pixi');
  stage = viewChild<ElementRef>('stage');

  public streamVizService: StreamVizService = inject(StreamVizService);

  counters: WritableSignal<Counter[]> = signal<Counter[]>([]);
  taps: WritableSignal<Tap[]> = signal<Tap[]>([]);

  rightClickEmitter?: Emitter;
  rightClickOperator?: Operator;

  backgroundColor: string = '#00ff00';

  editorOptions = { theme: 'vs-dark', language: 'typescript' };

  generatedCode: string = '';

  code = '';
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
    {
      label: 'Get Line',
      icon: 'pi pi-trash',
      command: (e) => {
        if (this.rightClickEmitter) {
          this.getLineFromEmitter(this.rightClickEmitter);
        }
      },
    },
    {
      label: 'Reset',
      icon: 'pi pi-trash',
      command: (e) => {
        if (this.rightClickEmitter) {
          this.resetLine(this.rightClickEmitter);
        }
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
  selectedTap?: Tap;

  items: WritableSignal<Item[]> = signal([]);
  emitters: WritableSignal<Emitter[]> = signal([]);
  rootEmitters = computed(() => this.emitters().filter((e) => e.isStartEmitter));
  connections: WritableSignal<any[]> = signal<any[]>([]);
  targetConnections = computed(() => this.connections().filter((c) => c.isTargetConnection));
  noneTargetConnections = computed(() => this.connections().filter((c) => !c.isTargetConnection));

  operators: WritableSignal<Operator[]> = signal([]);

  itemSpriteMap: Map<any, any> = new Map();
  app?: PIXI.Application;

  editorInitialized(e: any) {
    console.log('editor initialized');
    // let monaco = window.monaco;
    // let model = monaco.editor.createModel("Hello");
    // editor.setModel(model)
  }
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
      (o) => o.type === 'takeuntil' && (o as TakeUntilOperator).targetOperator,
    );

    const switchMapOperatorsWithTarget = this.operators().filter(
      (o) => o.type === 'switchMapTo' && (o as SwitchMapToOperator).targetOperator,
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
        cons.push({
          id: e.id + '-' + o.id,
          from: { x: e.x() + e.width + 15, y: e.y() + 10 },
          to: { x: o.x() - 10, y: e.y() + 10 },
          dash,
        });
      });
    });

    [...takeUntilOperatorsWithTarget, ...switchMapOperatorsWithTarget].forEach((o) => {
      const source = o;
      const destination = (o as TakeUntilOperator).targetOperator;
      if (destination) {
        cons.push({
          id: source.id + '-' + destination.id,
          isTargetConnection: true,
          from: {
            x: source.x() + source?.width() - 20,
            y: source.y() + source?.height() / 2,
          },
          to: {
            x: destination?.x() + destination?.width() / 2,
            y: destination?.y() + destination?.height() / 2,
          },
        });
      }
    });

    this.connections.update(() => cons);
    this.generateCode();
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
        emitter.y.update(() => 50 + index * 60);
        emitter.x.update(() => 20);
      });
  }

  addEmitterFromDescription(emitterDescription: EmitterDescription) {
    if (!emitterDescription) {
      return;
    }
    const emitter: Emitter = emitterDescription.hasOwnProperty('implementation')
      ? new emitterDescription.implementation()
      : emitterDescription.implementationFactory && emitterDescription.implementationFactory();

    emitter.type = emitterDescription.name;
    emitter.valueType = emitterDescription.valueType;
    emitter.onItem = (item: Item) => {
      // item.x.update(() => 10);
      item.emitterID = emitter.id;
      this.addItem(item);
    };
    emitter.isStartEmitter = true;
    this.emitters.update((emitters) => [...emitters, emitter]);

    this.updateOperatorInputs();
    this.updateRootEmitterPosition();
    return emitter;
  }

  addCounter() {
    this.counters.update((x) => [...x, new Counter()]);
  }

  addTap() {
    this.taps.update((x) => [...x, new Tap()]);
  }

  addOperator(operatorDescription: OperatorDescription, event?: MouseEvent) {
    const o = new operatorDescription.implementation(this, this.injector) as Operator;
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

  resetLineWithOperator(operator: Operator) {
    const startEmitters = this.emitters().filter((e) => e.isStartEmitter);
    const emitter = startEmitters.find((emitterToCheck) =>
      this.getLineFromEmitter(emitterToCheck).operators.find((o) => o === operator),
    );
    if (emitter) {
      this.resetLine(emitter);
    }
  }

  getLineWithOperator(operator: Operator) {
    const startEmitters = this.emitters().filter((e) => e.isStartEmitter);
    const emitter = startEmitters.find((emitterToCheck) =>
      this.getLineFromEmitter(emitterToCheck).operators.find((o) => o === operator),
    );
    if (emitter) {
      return this.getLineFromEmitter(emitter);
    }
    return null;
  }

  resetLine(emitterToCheck: Emitter) {
    let { operators, emitters } = this.getLineFromEmitter(emitterToCheck);

    let takeUntilOperators: TakeUntilOperator[] = operators.filter(
      (o: any) => o.type === 'takeuntil',
    ) as TakeUntilOperator[];
    takeUntilOperators.forEach((o) => (o.triggered = false));
    this.updateOperatorInputs();
  }

  getLineFromEmitter(emitterToCheck: Emitter) {
    let emittersInLine = [];
    let currentEmitter: Emitter | undefined = emitterToCheck;
    const operators = [];
    while (currentEmitter && currentEmitter.operator) {
      emittersInLine.push(currentEmitter);

      if (currentEmitter.operator) {
        operators.push(currentEmitter.operator);
      }

      if (currentEmitter.operator.type === 'takeuntiltarget') {
        const takeUntilOperator = currentEmitter.operator as TakeUntilOperatorTarget;
        const takeUntilSourceOperator = takeUntilOperator.sourceOperator;
        currentEmitter = this.emitters().find((e) => e.operator === takeUntilSourceOperator);
      } else if (currentEmitter) {
        const operatorEmitters = this.emitters().filter((e) => e.belongsToOperator === currentEmitter?.operator);
        if (operatorEmitters.length === 1) {
          currentEmitter = operatorEmitters[0];
        } else {
          currentEmitter = operatorEmitters.find((e) => e.previousEmitter === currentEmitter);
        }
      }
    }

    return {
      operators,
      emitters: emittersInLine,
    };
  }

  getOperatorLines() {
    const startEmitters = this.emitters().filter((e) => e.isStartEmitter);

    this.emitters().forEach((e) => e.hot.update(() => false));

    startEmitters.forEach((emitterToCheck) => {
      let { operators, emitters } = this.getLineFromEmitter(emitterToCheck);
      let untilTriggered = operators.find((o: any) => o.triggered && o.type === 'takeuntil');
      if (untilTriggered) {
        console.log('was trigerred!!!!!!!!');
      }
      // let hasUntilTriggerTarget = operators.find((o: any) => o.type === 'takeuntiltarget');
      let hasSwitchMapTarget = operators.find((o: any) => o.type === 'switchMapToTarget') as SwitchMapToOperatorTarget;

      if (emitters.length === 0) {
        emitters = [emitterToCheck];
      }

      const hasActiveSwitchMapTarget = hasSwitchMapTarget && hasSwitchMapTarget.isActive;
      // const hasActiveUntilTriggerTarget = hasUntilTriggerTarget && hasUntilTriggerTarget.isActive;

      const isHot =
        (!untilTriggered && hasActiveSwitchMapTarget) ||
        (operators.length > 0 && operators[operators.length - 1].type === 'consumer');

      emitterToCheck.isHot.update((s) => isHot);
      emitters.forEach((e) => e.hot.update(() => isHot));
    });
  }

  selectedOperatorDataType: string = '';
  selectOperator(operator: Operator) {
    if (this.selectedOperator === operator) {
      this.selectedOperator = undefined;
      return;
    }
    this.selectedOperator = operator;
    const emitter = this.emitters().find((e) => e.operator === operator);
    console.log('Operator data type: ', emitter?.valueType);
    if (emitter?.valueType) {
      this.selectedOperatorDataType =
        this.streamVizService.types +
        `

        declare const input:${emitter.valueType};
      
      `;

      console.log(this.selectedOperatorDataType);
    }
  }

  selectTap(tap: Tap) {
    this.selectedTap = tap;
  }

  save() {
    const emitters = this.emitters()
      .filter((e) => e.isStartEmitter)
      .map((e) => {
        console.log('save ', e);
        return {
          id: e.id,
          type: e.type,
        };
      });

    const operators = this.operators().map((o: any) => {
      console.log('Operator ', o);
      return {
        type: o.type,
        x: o.x(),
        y: o.y(),
        id: o.id,
        width: o.width(),
        height: o.height(),
        value1: o.value1,
        targetID: o.targetOperator?.id,
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
          const emitter = this.addEmitterFromDescription(emitterDescription);
          if (emitter) {
            emitter.id = e.id;
          }
        }
      });

      const operatorsWithoutDescription = stored.operators.filter((o: any) =>
        this.streamVizService.operators().find((d) => d.name === o.type),
      );

      stored.operators.forEach((o: any) => {
        const operatorDescription = this.streamVizService
          .operators()
          .find((d) => d.name.toLowerCase() === o.type.toLowerCase());
        if (operatorDescription) {
          const operator = this.addOperator(operatorDescription);
          console.log('Add operator ', operator.type);
          operator.x.update(() => o.x);
          operator.y.update(() => o.y);
          operator.width.update(() => o.width);
          operator.height.update(() => o.height);
          operator.value1 = o.value1;
          operator.id = o.id;

          if (o.targetID) {
            console.log('yes target ID');
            const storedOp = stored.operators.find((op: any) => op.id === o.targetID);
            console.log('Target ID ', o.targetID);

            let targetOperator;
            if (o.type === 'switchMapTo') {
              targetOperator = this.addOperator({
                implementation: SwitchMapToOperatorTarget,
                name: 'switchMapToTarget',
              }) as any;
            } else if (o.type === 'takeuntil') {
              targetOperator = this.addOperator({
                implementation: TakeUntilOperatorTarget,
                name: 'switchMapToTarget',
              }) as any;
            }
            console.log('target operator ', targetOperator);

            (operator as any).addTarget(targetOperator);

            targetOperator.x.update(() => storedOp.x);
            targetOperator.y.update(() => storedOp.y);
            targetOperator.width.update(() => storedOp.width);
            targetOperator.height.update(() => storedOp.height);
          }
        } else {
          console.log('no description', o);
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

  generateCode() {
    const rootEmitters = this.emitters().filter((e) => e.isStartEmitter);
    const lines = rootEmitters.map((e) => this.getLineFromEmitter(e));

    const streamCode = lines.map((line, index) => {
      const id = rootEmitters[index].id;
      let code = `const stream${id}$ = source${id}.pipe(\n`;
      const lineOperators = line.operators.filter(
        (o) => o.type !== 'consumer' && o.type !== 'switchMapToTarget' && o.type !== 'takeuntiltarget',
      );
      lineOperators.forEach((o, index) => {
        const isLastLine = lineOperators.length - 1 === index;
        const c = o.getCode();
        code += '    ' + o.getCode() + (isLastLine ? '\n' : ',\n');
      });
      code += ');';
      return code;
    });

    const code = '\n' + streamCode.join('\n\n');
    this.generatedCode = code;
  }
}
