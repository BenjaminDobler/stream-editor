import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SplitterModule } from "primeng/splitter";

@Component({
    selector: 'splitter',
    imports: [
        CommonModule,
        SplitterModule
    ],
    templateUrl: './splitter.component.html',
    styleUrl: './splitter.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplitterComponent {


  onHorizontalResizeEnd(e:any) {
  }

 }
