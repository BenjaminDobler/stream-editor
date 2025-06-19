import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/*
  This component draws connections between emitters and operators.
  It uses the input `connections` to determine which connections to draw.
  The `showStartMarker` input determines whether to show a marker at the start of the connection.

*/
@Component({
  selector: 'connections',
  imports: [CommonModule],
  templateUrl: './connections.component.html',
  styleUrl: './connections.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectionsComponent {
  connections = input<any[]>();
  showStartMarker = input<boolean>(false);
}
