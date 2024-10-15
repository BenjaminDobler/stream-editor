import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>context-menu works!</p>`,
  styleUrl: './context-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent { }
