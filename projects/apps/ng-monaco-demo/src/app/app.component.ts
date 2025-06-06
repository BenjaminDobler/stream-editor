import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgMonacoComponent, MonacoService } from "@richapps/ng-monaco";
import { RXJSLoader } from './rxjs.loader/rxjs.loader';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NgMonacoComponent, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo';

  monacoService = inject(MonacoService);

  declarations = signal('');

  tsCode = 'const test: Observable;';


  constructor() {

    this.init();
  }

  async init() {


    const monaco = await this.monacoService.load();

    const loader = new RXJSLoader(monaco);
    await loader.addRxjsLibs();
    console.log('Monaco loaded ');


    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true,
      paths: {
          rxjs: ['file://node_modules/rxjs/index.d.ts'],
          // '@twin/vc-types': ['file://node_modules/vc-types/vc-interfaces.ts'],
      },
  });

  }


}
