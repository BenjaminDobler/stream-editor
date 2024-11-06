import { rxjsTypeFiles } from './rxjs.files';

export class RXJSLoader {
  constructor(private monaco: any) {}

  async addRxjsLibs() {
    const addDeclaration = async (f: any) => {
      const declarationURL = location.origin + '/assets/' + f;
      const response = await fetch(declarationURL);
      const data = await response.text();
      console.log('add file ', 'file://node_modules/' + f);
      this.monaco.languages.typescript.typescriptDefaults.addExtraLib(data, 'file://node_modules/' + f);
    };

    await Promise.all(rxjsTypeFiles.map((f) => addDeclaration(f)));
  }
}
