import { editor, languages } from 'monaco-editor/esm/vs/editor/editor.api';

export interface MonacoAPI {
  editor: typeof editor;
  languages: typeof languages;
}

export class MonacoService {
  loadPromise?: Promise<any>;
  constructor() {
    this.load();
  }
  load() {
    if (!this.loadPromise) {
      this.loadPromise = new Promise((resolve, reject) => {
        const script: HTMLScriptElement = document.createElement('script');
        script.onerror = (e) => {
          console.log('on error ', e);
        };

        script.onload = () => {
          (window as any).require.config({ paths: { vs: '/assets/monaco/min/vs' } });
          (window as any).require(['vs/editor/editor.main'], (monaco: MonacoAPI) => {
            resolve(monaco);
          });
        };

        script.type = 'text/javascript';
        script.src = '/assets/monaco/min/vs/loader.js';
        script.async = true;
        document.body.appendChild(script);
      });
    }
    return this.loadPromise;
  }
}
