import { ApplicationConfig,provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideExperimentalZonelessChangeDetection()/*provideZoneChangeDetection({ eventCoalescing: true })*/, provideRouter(routes)]
};
