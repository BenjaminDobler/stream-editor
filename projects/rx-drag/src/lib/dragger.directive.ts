import { Directive, ElementRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { makeDraggable } from './drag.util';

@Directive({
  selector: '[draggable]',
  standalone: true,
})
export class DraggerDirective {
  el: ElementRef = inject(ElementRef);

  @Input()
  positioning: 'none' | 'absolute' | 'transform' = 'absolute';

  @Output()
  positionUpdated: EventEmitter<{ x: number; y: number }> = new EventEmitter<{ x: number; y: number }>();

  @Output()
  widthUpdated: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  heightUpdated: EventEmitter<number> = new EventEmitter<number>();

  ngAfterViewInit() {
    const itemElement = this.el?.nativeElement;
    const parentElement = itemElement.parentElement;
    let parentRect = parentElement.getBoundingClientRect();
    let itemRect = itemElement.getBoundingClientRect();

    // const setX = (x: number) => {
    //   if (this.positioning === 'absolute') {
    //     itemElement.style.left = x + 'px';
    //   } else if (this.positioning === 'transform') {
    //     itemElement.style.transform;
    //   }
    // };
    // const setY = (y: number) => (itemElement.style.top = y + 'px');
    const setWidth = (width: number) => {
      this.positioning !== 'none' && (itemElement.style.width = width + 'px');
      this.widthUpdated.emit(width);
    };
    const setHeight = (height: number) => {
      this.positioning !== 'none' && (itemElement.style.height = height + 'px');
      this.heightUpdated.emit(height);
    };

    const pos = (x: number, y: number) => {
      if (this.positioning === 'absolute') {
        itemElement.style.left = x + 'px';
        itemElement.style.top = y + 'px';
      } else if (this.positioning === 'transform') {
        itemElement.style.transform = `translate(${x}px, ${y}px)`;
      }

      this.positionUpdated.emit({ x, y });
    };

    const drag = makeDraggable(itemElement);

    drag.dragStart$.subscribe(() => {
      itemRect = itemElement.getBoundingClientRect();
      parentRect = parentElement.getBoundingClientRect();
    });
    drag.dragMove$.subscribe((move) => {
      // console.log('drag move ', move);

      const isBottomHeightDrag = move.startOffsetY > itemRect.height - 10;
      const isLeftWidthDrag = move.startOffsetX < 10;
      const isRightWidthDrag = move.startOffsetX > itemRect.width - 10;
      const isTopHeightDrag = move.startOffsetY < 10;

      if (!isBottomHeightDrag && !isLeftWidthDrag && !isRightWidthDrag && !isTopHeightDrag) {
        const offsetX = move.originalEvent.x - move.startOffsetX;
        const offsetY = move.originalEvent.y - move.startOffsetY;

        const x = offsetX - parentRect.left;
        const y = offsetY - parentRect.top;

        pos(x, y);
      } else if (isBottomHeightDrag) {
        const height = move.originalEvent.y - itemRect.top + itemRect.height - move.startOffsetY;
        setHeight(height);
      } else if (isRightWidthDrag) {
        const width = move.originalEvent.x - itemRect.left + itemRect.width - move.startOffsetX;
        setWidth(width);
      } else if (isLeftWidthDrag) {
        const x = move.originalEvent.x - move.startOffsetX - parentRect.left;
        const y = move.originalEvent.y - move.startOffsetY - parentRect.top;
        const width = itemRect.left - parentRect.left + itemRect.width - x;

        pos(x, y);
        setWidth(width);
      } else if (isTopHeightDrag) {
        const x = move.originalEvent.x - move.startOffsetX - parentRect.left;

        const y = move.originalEvent.y - move.startOffsetY - parentRect.top;
        const height = itemRect.top - parentRect.top + itemRect.height - y;
        pos(x, y);
        setHeight(height);
      }
    });

    drag.dragStart$.subscribe(() => {
      console.log('drag start');
    });
  }
}
