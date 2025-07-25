import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';

import Aura from '@primeuix/themes/aura';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideStreamViz } from '@richapps/stream-viz';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStreamViz(),
    provideAnimations(),
    provideZonelessChangeDetection() /*provideZoneChangeDetection({ eventCoalescing: true })*/,
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ],
};
