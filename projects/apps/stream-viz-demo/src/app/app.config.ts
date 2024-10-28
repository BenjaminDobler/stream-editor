import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { MonacoEditorModule, provideMonacoEditor } from 'ngx-monaco-editor-v2';

export function onMonacoLoad() {
  const monaco = (window as any).monaco;
  console.log('on monaco load!');

  const libSource = `

    export interface Item {
      value: number;
    }

    declare const item: Item;
  `;

  monaco.languages.typescript.typescriptDefaults.addExtraLib(libSource);
  // When resolving definitions and references, the editor will try to use created models.
  // Creating a model for the library allows "peek definition/references" commands to work with the library.
  // monaco.editor.createModel(libSource, 'typescript');
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideMonacoEditor({
      onMonacoLoad,
    }),
    provideAnimations(),
    provideExperimentalZonelessChangeDetection() /*provideZoneChangeDetection({ eventCoalescing: true })*/,
    provideRouter(routes),
  ],
};
