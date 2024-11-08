import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, inject, input } from '@angular/core';
import { DraggerDirective } from '@richapps/rx-drag';
import { Operator } from '../../model/operators/base.operator';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from 'primeng/contextmenu';

@Component({
  selector: 'operator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './operator.component.html',
  styleUrl: './operator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: DraggerDirective,
      outputs: ['heightUpdated', 'widthUpdated', 'positionUpdated'],
      inputs: ['positioning'],
    },
  ],
})
export class OperatorComponent {
  @HostBinding('style.width') get width() {
    return this.operator()?.width() + 'px';
  }
  @HostBinding('style.height') get height() {
    return this.operator()?.height() + 'px';
  }

  @HostBinding('class.isTarget') get isTarget() {
    return this.operator().type === 'takeuntiltarget' || this.operator().type === 'switchMapToTarget';
  }
  @HostBinding('style.background') get background() {
    return (this.operator() as any)?.triggered ? '#298715' : 'var(--operator-bg)';
  }
  @HostBinding('style.transform') get transform() {
    return 'translate(' + this.operator()?.x() + 'px,' + this.operator()?.y() + 'px)';
  }

  operator = input.required<Operator>();

  private dragDirective: DraggerDirective = inject(DraggerDirective);

  @HostListener('heightUpdated', ['$event'])
  heightUpdated(h: any) {
    this.operator()?.setHeight(h);
  }

  @HostListener('widthUpdated', ['$event'])
  widthUpdated(w: any) {
    this.operator()?.setWidth(w);
  }

  @HostListener('positionUpdated', ['$event'])
  positionUpdated($event: any) {
    this.operator()?.setPos($event);
  }

  ngAfterViewInit() {
    this.dragDirective.positioning = 'none';
    const type = this.operator().type;
    this.dragDirective.resizable = type !== 'takeuntiltarget' && type !== 'switchMapToTarget';
  }
}
