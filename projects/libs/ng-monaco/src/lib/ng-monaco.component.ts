import { Component, effect, ElementRef, inject, input, output, viewChild } from '@angular/core';
import { MonacoAPI, MonacoService } from './services/monaco.service';

@Component({
    selector: 'ng-monaco',
    imports: [],
    template: ` <div class="editor-container" #editor></div> `,
    styleUrls: ['./ng-monaco.component.scss']
})
export class NgMonacoComponent {
  monacoService: MonacoService = inject(MonacoService);
  editorEl = viewChild<ElementRef<HTMLDivElement>>('editor');
  editor?: any;
  monaco?: any;
  model?: any;

  declarations = input<string>('');
  code = input<string>('');
  codeChanged = output<string>();
  language = input<string>('typescript');

  constructor() {
    effect(() => {
      const declarations = this.declarations();
      if (this.monaco) {
        this.monaco.languages.typescript.typescriptDefaults.setExtraLibs([{ content: declarations }]);
      }
    });

    effect(() => {
      const code = this.code();
      if (this.editor) {
        const currentValue = this.editor.getModel().getValue();
        if (currentValue !== code) {
          this.editor.getModel().setValue(code);
        }
      }
    });
  }

  async ngOnInit() {
    const monaco = await this.monacoService.load();
    this.monaco = monaco;

    if (this.declarations() !== '') {
      this.monaco.languages.typescript.typescriptDefaults.setExtraLibs([{ content: this.declarations() }]);
    }

    this.editor = monaco.editor.create(this.editorEl()?.nativeElement, {
      value: this.code(),
      language: this.language(),
      theme: 'vs-dark',
      automaticLayout: true,
    });

    this.editor.onDidChangeModelContent((e: any) => {
      const currentValue = this.editor.getModel().getValue();
      if (this.code() !== currentValue) {
        this.codeChanged.emit(currentValue);
      }
    });
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.dispose();
    }
    if (this.model) {
      this.model.dispose();
    }
  }
}
