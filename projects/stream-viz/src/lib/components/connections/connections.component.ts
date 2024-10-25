import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'connections',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './connections.component.html',
  styleUrl: './connections.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectionsComponent { 

  connections = input<any[]>();
  showStartMarker = input<boolean>(false);

}
