import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StreamVizComponent, StreamVizService } from '@richapps/stream-viz';
import { SpeedEmitter } from './components/speed.emitter';
import { Subject } from 'rxjs';

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
    const topicSubjectMap: Map<string, Subject<any>> = new Map<string, Subject<any>>();

    const exampleSocket = new WebSocket('ws://localhost:6345');

    this.streamViz.addTypes(`
      interface StatefulUInt32 {
        status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
        value: number;
    }


interface DetailedLocation {
  status: 'STATUS_UNDEFINED' | 'STATUS_VALID' | 'STATUS_UNSUPPORTED' | 'STATUS_ERROR';
  longitude: number;
  latitude: number;
  accuracyHorizontal: number;
  altitudeWGS84: number;
  accuracyVertical: number;
  headingYawAngle: number;
  accuracyHeadingYawAngle: number;
  preciseLocalTimeSeconds: number;
  speed2D: number;
  accuracySpeed2D: number;
  speed3D: number;
  accuracySpeed3D: number;
  altitudeMeanSeaLevel: number;
}
  `);

    const onConnectionOpen = () => {
      this.streamViz.addEmitter({
        implementationFactory: () => {
          const obs$ = subscribeToTopic('cso/v1/vehicle/motion/longitudinal/speed/displayed') as Subject<any>;
          return new SpeedEmitter(obs$);
        },
        name: 'Speed',
        valueType: 'StatefulUInt32',
      });

      this.streamViz.addEmitter({
        implementationFactory: () => {
          const obs$ = subscribeToTopic('cso/v1/vehicle/location/detailed/deadReckoning') as Subject<any>;
          return new SpeedEmitter(obs$);
        },
        name: 'DeadReckoning',
        valueType: 'DetailedLocation',
      });
    };

    exampleSocket.onopen = () => {
      console.log('connected');
      onConnectionOpen();
    };

    exampleSocket.onmessage = (event) => {
      console.log('on message');
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'data') {
          const subj = topicSubjectMap.get(message.topic);
          subj?.next(message.data);
        }
      } catch (e) {}
    };

    const subscribeToTopic = (topic: string) => {
      console.log('subscribe to topic ', topic);
      let obs$;
      if (!topicSubjectMap.has(topic)) {
        exampleSocket.send(
          JSON.stringify({
            type: 'subscribe',
            topic,
          }),
        );
        topicSubjectMap.set(topic, new Subject());
      }
      return topicSubjectMap.get(topic);
    };
  }
}
