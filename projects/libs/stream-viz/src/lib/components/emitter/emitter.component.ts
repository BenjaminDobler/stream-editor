import { ChangeDetectionStrategy, Component, input, model, signal, ViewChild } from '@angular/core';
import { Emitter } from '../../model/emitter/emitter';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContextMenu, ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'emitter',
  imports: [FormsModule, CommonModule, ContextMenuModule],
  templateUrl: './emitter.component.html',
  styleUrl: './emitter.component.scss',
  host: {
    '[style.transform]': "'translate(' + emitter().x() + 'px,' + emitter().y() + 'px)'",
    '[style.width]': "emitter().isStartEmitter ? size().width + 'px': emitter().width + 'px'",
    '[style.height]': "size().height + 'px'",
    style: 'color: #fff',
    class: 'emitter start',
    '(click)': 'emitter().activate()',
    '(contextmenu)': 'onEmitterContextMenu($event, emitter())',
  },
})
export class EmitterComponent {
  emitterContextMenuItems: MenuItem[] = [
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: (e) => {
        // this.emitters.update((emitters) => emitters.filter((e) => e !== this.rightClickEmitter));
        // this.rightClickEmitter?.destroy();
        // this.updateRootEmitterPosition();
        // this.updateOperatorInputs();
      },
    },
    {
      label: 'Get Line',
      icon: 'pi pi-trash',
      command: (e) => {
        // if (this.rightClickEmitter) {
        //   this.getLineFromEmitter(this.rightClickEmitter);
        // }
      },
    },
    {
      label: 'Reset',
      icon: 'pi pi-trash',
      command: (e) => {
        // if (this.rightClickEmitter) {
        //   this.resetLine(this.rightClickEmitter);
        // }
      },
    },
  ];

  @ViewChild('contextMenu') contextMenu?: ContextMenu;

  emitter = input.required<Emitter>();
  size = input<{ width: number; height: number }>({
    width: 100,
    height: 100,
  });

  onEmitterContextMenu(event: any) {
    if (this.contextMenu) {
      this.contextMenu.model = this.emitterContextMenuItems;
      this.contextMenu.target = event.currentTarget;
      this.contextMenu.show(event);
    }
  }
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
