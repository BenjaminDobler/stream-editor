import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { MonacoAPI, MonacoService } from './services/monaco.service';

@Component({
  selector: 'ng-monaco',
  standalone: true,
  imports: [],
  template: `
    <button (click)="change()">Change</button>
    <div class="editor-container" #editor></div>
  `,
  styleUrls: ['./ng-monaco.component.scss'],
})
export class NgMonacoComponent {
  monacoService: MonacoService = inject(MonacoService);
  editorEl = viewChild<ElementRef<HTMLDivElement>>('editor');
  editor?: any;
  monaco?: any;

  model?: any;

  async ngOnInit() {
    const monaco = await this.monacoService.load();
    this.monaco = monaco;
    console.log('loaded!');
    console.log(monaco);

    var libSource = `
    

    interface Item {
      value: number;
    }
      declare var item: Item;
    
    `;
    var libUri = 'ts:filename/facts.d.ts';
    monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri);


    monaco.languages.typescript.typescriptDefaults.setExtraLibs([{ content: `declare const test = "initial";` }])


    // When resolving definitions and references, the editor will try to use created models.
    // Creating a model for the library allows "peek definition/references" commands to work with the library.
    this.model = monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));

    this.editor = monaco.editor.create(this.editorEl()?.nativeElement, {
      value: 'console.log("Hello, world")',
      language: 'typescript',
    });

    //this.editor.setModel(model);
  }

  change() {

    this.monaco.languages.typescript.typescriptDefaults.setExtraLibs([{ content: `declare const test = "updated";` }])

    // if (this.monaco) {
    //   this.editor.dispose();
    //   this.model.dispose();

    //   console.log(this.editor);
    //   console.log('change!');
    //   var libSource = `
    


    //   interface DisplayedSpeed {
    //     value: number;
    //     status: 'ERROR'|'VALID';
    //   }

    // interface Item {
    //   value: DisplayedSpeed;
    //   data: string;
    // }
    //   declare var item: Item;
    
    // `;

    //   var libUri = 'ts:filename/facts.d.ts';
    //   this.monaco.languages.typescript.typescriptDefaults.addExtraLib(libSource, libUri);

    //   this.monaco.languages.typescript.typescriptDefaults.setExtraLibs([{ content: `declare const test = "initial";` }])


    //   this.model = this.monaco.editor.createModel(libSource, 'typescript', this.monaco.Uri.parse(libUri));

    //   this.editor = this.monaco.editor.create(this.editorEl()?.nativeElement, {
    //     value: 'console.log("Hello, world")',
    //     language: 'typescript',
    //   });

    //   // this.monaco.editor.createModel(libSource, 'typescript', this.monaco.Uri.parse(libUri));
    // }
  }
}
