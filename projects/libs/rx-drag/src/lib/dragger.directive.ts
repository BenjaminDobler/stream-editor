import { Directive, ElementRef, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { makeDraggable } from './drag.util';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[draggable]',
  standalone: true,
})
export class DraggerDirective {
  el: ElementRef = inject(ElementRef);

  @Input()
  positioning: 'none' | 'absolute' | 'transform' = 'absolute';

  @Input()
  resizable = true;

  @Input()
  minWidth = 0;

  @Input()
  minHeight = 0;

  @Output()
  positionUpdated: EventEmitter<{ x: number; y: number }> = new EventEmitter<{ x: number; y: number }>();

  @Output()
  widthUpdated: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  heightUpdated: EventEmitter<number> = new EventEmitter<number>();

  viewportScale = input<number>(1);

  onDestroy$ = new Subject<void>();

  public resizeOffset = 5;

  ngAfterViewInit() {
    const itemElement = this.el?.nativeElement;
    const parentElement = itemElement.parentElement;

    let parentRect = parentElement.getBoundingClientRect();
    let itemRect = itemElement.getBoundingClientRect();

    const setWidth = (width: number) => {
      this.positioning !== 'none' && (itemElement.style.width = `${width}px`);
      this.widthUpdated.emit(width);
    };
    const setHeight = (height: number) => {
      this.positioning !== 'none' && (itemElement.style.height = `${height}px`);
      this.heightUpdated.emit(height);
    };

    const pos = (x: number, y: number) => {
      x = x / this.viewportScale();
      y = y / this.viewportScale();
      console.log(this.viewportScale());
      if (this.positioning === 'absolute') {
        itemElement.style.left = `${x}px`;
        itemElement.style.top = `${y}px`;
      } else if (this.positioning === 'transform') {
        itemElement.style.transform = `translate(${x}px, ${y}px)`;
      }

      this.positionUpdated.emit({ x, y });
    };

    const drag = makeDraggable(itemElement);

    drag.dragStart$.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      itemRect = itemElement.getBoundingClientRect();
      parentRect = parentElement.getBoundingClientRect();
    });
    drag.dragMove$.pipe(takeUntil(this.onDestroy$)).subscribe((move) => {
      this.resizeOffset = this.resizable ? this.resizeOffset : 0;

      const isBottomHeightDrag = move.startOffsetY > itemRect.height - this.resizeOffset;
      const isLeftWidthDrag = move.startOffsetX < this.resizeOffset;
      const isRightWidthDrag = move.startOffsetX > itemRect.width - this.resizeOffset;
      const isTopHeightDrag = move.startOffsetY < this.resizeOffset;

      if (!isBottomHeightDrag && !isLeftWidthDrag && !isRightWidthDrag && !isTopHeightDrag) {
        const offsetX = move.originalEvent.x - move.startOffsetX;
        const offsetY = move.originalEvent.y - move.startOffsetY;

        const x = offsetX - parentRect.left;
        const y = offsetY - parentRect.top;

        pos(x, y);
      } else if (isBottomHeightDrag) {
        let height = move.originalEvent.y - itemRect.top + itemRect.height - move.startOffsetY;
        height = Math.max(height, this.minHeight);
        setHeight(height);
      } else if (isRightWidthDrag) {
        let width = move.originalEvent.x - itemRect.left + itemRect.width - move.startOffsetX;
        width = Math.max(width, this.minWidth);

        setWidth(width);
      } else if (isLeftWidthDrag) {
        const x = move.originalEvent.x - move.startOffsetX - parentRect.left;
        const y = move.originalEvent.y - move.startOffsetY - parentRect.top;
        const width = itemRect.left - parentRect.left + itemRect.width - x;

        if (width > this.minWidth) {
          pos(x, y);
          setWidth(width);
        }
      } else if (isTopHeightDrag) {
        const x = move.originalEvent.x - move.startOffsetX - parentRect.left;

        const y = move.originalEvent.y - move.startOffsetY - parentRect.top;
        const height = itemRect.top - parentRect.top + itemRect.height - y;
        if (height > this.minHeight) {
          pos(x, y);
          setHeight(height);
        }
      }
    });

    drag.dragStart$.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      // console.log('drag start');
    });
  }

  ngDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
