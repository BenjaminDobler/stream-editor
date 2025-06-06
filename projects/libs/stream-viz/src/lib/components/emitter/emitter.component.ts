import { ChangeDetectionStrategy, Component, input, model, signal } from '@angular/core';
import { Emitter } from '../../model/emitter/emitter';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'emitter',
  imports: [FormsModule, CommonModule],
  templateUrl: './emitter.component.html',
  styleUrl: './emitter.component.scss',
  host: {
    '[style.transform]': "'translate(' + emitter().x() + 'px,' + emitter().y() + 'px)'",
    '[style.width]': "emitter().isStartEmitter ? size().width + 'px': emitter().width + 'px'",
    '[style.height]': "size().height + 'px'",
    style: 'color: #fff',
    class: 'emitter start',
    '(click)': 'emitter().activate()',
  },
})
export class EmitterComponent {
  emitter = input.required<Emitter>();
  size = input<{ width: number; height: number }>({
    width: 100,
    height: 100,
  });



}

/*
[style.transform]="'translate(' + emitter.x() + 'px,' + emitter.y() + 'px)'"
            [style.width]="emitter.width + 'px'"
            style="color: #fff"
            class="emitter start"
            [style.width]="eStyle.width + 'px'"
            [style.height]="eStyle.height + 'px'"
            (click)="emitter.activate()"
            */
