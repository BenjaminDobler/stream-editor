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
        var baseUrl = './assets/monaco/min/vs';

        const REGQUIRE_CONFIG = {
          preferScriptTags: true,
        };

        const onGotAmdLoader = (require: any) => {
          let usedRequire = require || (window as any).require;
          let requireConfig = { paths: { vs: `${baseUrl}` } };
          Object.assign(requireConfig, REGQUIRE_CONFIG || {});
          usedRequire.config(requireConfig);
          usedRequire([`vs/editor/editor.main`], (monaco: MonacoAPI) => {
            resolve(monaco);
          });
        };

        var src = `${baseUrl}/loader.js`;
        var loaderRequest = new XMLHttpRequest();
        loaderRequest.addEventListener('load', () => {
          let scriptElem = document.createElement('script');
          scriptElem.type = 'text/javascript';
          if ('require' in window) {
            scriptElem.text = `
                            // Monaco uses a custom amd loader that over-rides node's require.
                            // Keep a reference to node's require so we can restore it after executing the amd loader file.
                            var nodeRequire = require;
                            ${loaderRequest.responseText.replace('"use strict";', '')}
                            // Save Monaco's amd require and restore Node's require
                            var monacoAmdRequire = require;
                            require = nodeRequire;
                            require.nodeRequire = require;
                        `;
          } else {
            scriptElem.text = loaderRequest.responseText.replace('"use strict";', '');
          }

          document.body.appendChild(scriptElem);
          onGotAmdLoader((window as any).monacoAmdRequire);
        });
        loaderRequest.open('GET', src);
        loaderRequest.send();
      });
    }
    return this.loadPromise;
  }
}
