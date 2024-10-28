import { Component, effect, ElementRef, inject, input, output, viewChild } from '@angular/core';
import { MonacoAPI, MonacoService } from './services/monaco.service';

@Component({
  selector: 'ng-monaco',
  standalone: true,
  imports: [],
  template: ` <div class="editor-container" #editor></div> `,
  styleUrls: ['./ng-monaco.component.scss'],
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

  constructor() {
    effect(() => {
      console.log('declarations', this.declarations());
      this.monaco.languages.typescript.typescriptDefaults.setExtraLibs([{ content: this.declarations() }]);
    });

    effect(() => {
      console.log('code changed: ', this.code());
      const currentValue = this.editor.getModel().getValue();
      if (currentValue !== this.code()) {
        this.editor.getModel().setValue(this.code());
      }
    });
  }

  async ngOnInit() {
    const monaco = await this.monacoService.load();
    this.monaco = monaco;

    this.editor = monaco.editor.create(this.editorEl()?.nativeElement, {
      value: this.code(),
      language: 'typescript',
      theme: 'vs-dark',
    });

    this.editor.onDidChangeModelContent((e: any) => {
      const currentValue = this.editor.getModel().getValue();
      if (this.code() !== currentValue) {
        this.codeChanged.emit(currentValue);
      }
    });
  }

  ngOnDestroy() {
    this.editor.dispose();
    this.model.dispose();
  }
}
