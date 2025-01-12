import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { StreamVizComponent, StreamVizService } from '@richapps/stream-viz';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StreamVizComponent, ButtonModule, SliderModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  title = 'line-animation';

  speed = 2;
  emitterWidth = signal(200);
  emitterHeight = signal(30);

  verticalGap = signal(60);

  emitterStyles = computed(() => ({ width: this.emitterWidth(), height: this.emitterHeight() }));
  visible = true;

  streamViz: StreamVizService = inject(StreamVizService);

  constructor() {

  }


  logSerializedState(data: any) {
    console.log(data);
  }

  ngOnDestroy() {
    console.log('----- destroy');
  }
}
