import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, output, AfterViewInit, OnDestroy } from '@angular/core';
import * as PIXI from 'pixi.js';
import { Item } from '../../model/item';

/*
  This component renders bubbles using PIXI.js.
  It listens to changes in the `items` input and updates the rendered bubbles accordingly.
  The `backgroundColor` input sets the background color of the PIXI application.
  The `checkCollision` output emits an event to check for collisions between bubbles.
*/

@Component({
  selector: 'bubble-renderer',
  imports: [],
  templateUrl: './bubble-renderer.component.html',
  styleUrl: './bubble-renderer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BubbleRendererComponent implements AfterViewInit, OnDestroy {
  backgroundColor = input<string>('#000000');
  checkCollision = output<void>();
  items = input<Item[]>([]);

  private app?: PIXI.Application;
  private el = inject(ElementRef);
  private itemSpriteMap = new Map<Item, PIXI.Graphics>();

  constructor() {
    effect(() => {
      this.items().forEach((item) => {
        if (!this.itemSpriteMap.has(item)) {
          this.addItem(item);
        } else {
          const sprite = this.itemSpriteMap.get(item);
          if (sprite) {
            sprite.position.set(item.x(), item.y());
          }
        }
      });

      this.itemSpriteMap.forEach((sprite, item) => {
        if (!this.items().includes(item)) {
          this.removeItem(item);
        }
      });
    });
  }

  ngAfterViewInit() {
    this.initPixi();
  }

  async initPixi() {
    const app = new PIXI.Application();
    this.app = app;
    await app.init({ width: 1400, height: 360, background: this.backgroundColor(), backgroundAlpha: 0 });
    this.el.nativeElement.appendChild(app.canvas);

    app.ticker.add((ticker) => {
      this.checkCollision.emit();
    });
  }

  stop() {
    this.app?.ticker.stop();
  }

  start() {
    this.app?.ticker.start();
  }

  private addItem(item: Item) {
    const sprite = new PIXI.Graphics();

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
  }

  private removeItem(item: Item) {
    const sprite = this.itemSpriteMap.get(item);
    if (sprite) {
      this.app?.stage.removeChild(sprite);
    }
    this.itemSpriteMap.delete(item);
  }

  ngOnDestroy() {
    this.app?.destroy();
    this.itemSpriteMap.clear();
  }
}
