import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideStreamViz } from '@richapps/stream-viz';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStreamViz(),
    provideAnimations(),
    provideExperimentalZonelessChangeDetection() /*provideZoneChangeDetection({ eventCoalescing: true })*/,
    provideRouter(routes),
  ],
};
