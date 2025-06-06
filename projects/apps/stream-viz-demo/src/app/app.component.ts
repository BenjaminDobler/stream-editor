import { ChangeDetectionStrategy, Component, computed, effect, inject, Query, QueryList, signal, ViewChild, viewChild, ViewChildren, viewChildren } from '@angular/core';
import { StreamVizComponent, StreamVizService } from '@richapps/stream-viz';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    imports: [StreamVizComponent, ButtonModule, SliderModule, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  title = 'line-animation';

  editor = viewChild(StreamVizComponent);

  @ViewChildren(StreamVizComponent) streamVizComponent: QueryList<StreamVizComponent> | null= null;

  speed = 2;
  emitterWidth = signal(200);
  emitterHeight = signal(30);

  verticalGap = signal(60);

  emitterStyles = computed(() => ({ width: this.emitterWidth(), height: this.emitterHeight() }));
  visible = true;

  e2: StreamVizComponent | undefined;

  streamVizService: StreamVizService = new StreamVizService();

  constructor() {

    this.streamVizComponent?.changes.subscribe((components: QueryList<StreamVizComponent>) => {
      console.log('----- changes', components);
    });

    effect(() => {  
      console.log("Editor changed", this.editor())
      this.e2 = this.editor();
    });

  }


  restore() {
    if (this.editor()) {
      console.log('----- restore');

      this.editor()?.restore({...this.lastData, name: 'restored'});
    }
  }


  logSerializedState(data: any) {
    console.log(data);
  }

  ngOnDestroy() {
    console.log('----- destroy');
  }

  lastData: any = null;

  onStateBeforeDestroy(data: any) {
    console.log('----- before destroy');
    console.log(data);
    this.lastData = data;
  }
}
