/*
 * Public API Surface of stream-viz
 */

import { AngularSplitModule } from 'angular-split';




import { importProvidersFrom, makeEnvironmentProviders } from "@angular/core";
import { provideNGMonaco } from '@richapps/ng-monaco';

export function provideStreamViz() {
    return makeEnvironmentProviders([
      importProvidersFrom(AngularSplitModule),
      provideNGMonaco()
    ]);
  }





export * from './lib/stream-viz.component';
export { Emitter } from './lib/model/emitter/emitter';
export { StreamVizService } from './lib/services/stream-viz.service';

export * from './lib/model/item';
