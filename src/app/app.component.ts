import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StreamVizComponent } from 'stream-viz';
import { StreamVizService } from '../../projects/stream-viz/src/lib/services/stream-viz.service';
import { SpeedEmitter } from './components/speed.emitter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StreamVizComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'line-animation';

  streamViz: StreamVizService = inject(StreamVizService);

  constructor() {
    const speedEmitterFactory = () => {
      console.log('Build Speed Emitter');
      return new SpeedEmitter();
    };

    this.streamViz.addEmitter({ implementationFactory: speedEmitterFactory, name: 'Speed' });
  }
}
