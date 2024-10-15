import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { fromEvent, map, switchMap, takeUntil } from 'rxjs';

@Directive({
  selector: '[draggable]',
  standalone: true,
})
export class DragableDirective implements AfterViewInit {
  el: ElementRef = inject(ElementRef);
  @Output()
  dragging: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  item: any;

  ngAfterViewInit() {
    let parentRect: DOMRect;
    let rect: DOMRect;
    const target = this.el.nativeElement;
    const mousedown$ = fromEvent<MouseEvent>(target, 'mousedown');
    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
    const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup');

    const drag$ = mousedown$.pipe(
      switchMap((mouseDownEvent) => {
        parentRect = target.parentElement.getBoundingClientRect();
        rect = target.getBoundingClientRect();

        return mousemove$.pipe(
          map((mouseMoveEvent) => {
            console.log('offsetX', mouseDownEvent.offsetX);

            return {
              left: mouseMoveEvent.clientX - mouseDownEvent.offsetX,
              top: mouseMoveEvent.clientY - mouseDownEvent.offsetY,
              offsetX: mouseDownEvent.offsetX,
              offsetY: mouseDownEvent.offsetY,
            };
          }),
          takeUntil(mouseup$)
        );
      })
    );

    drag$.subscribe(({ left, top, offsetY }) => {
      // target.style.left = left + 'px';
      // target.style.top = top + 'px';
      let x = left - parentRect.left;

      let y = top - parentRect.top;

      if (rect.height - offsetY < 10) {
        console.log('drag heiht ', rect.height + y, y);
        target.style.height = `${rect.height + y}px`;
        if (this.item) {
          this.item.height = rect.height + y;
        }
      } else {
        x = Math.max(0, x);

        y = Math.max(0, y);

        target.style.transform = `translate(${x}px, ${y}px)`;
        if (this.item) {
          this.item.x = x;
          this.item.y = y;
        }
      }
      this.dragging.emit({ x });
    });
  }
}
