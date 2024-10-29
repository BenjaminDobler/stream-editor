import { ensureDirSync, existsSync, readJSON, readJsonSync, symlinkSync } from 'fs-extra';

import { dirname, join, resolve } from 'path';


const projectName = process.argv.find((arg) => arg.startsWith('--project='))?.split('=')[1];

if (projectName) {
  const ngconf = readJsonSync('./angular.json');
  const project = ngconf.projects[projectName];
  const projectPKG = readJsonSync(join(project.root, 'package.json'));
  const ngPackagePKG = readJsonSync(join(project.root, 'ng-package.json'));
  const dest = ngPackagePKG.dest;
  const libName = projectPKG.name;
  const fromPath = resolve(project.root, dest);
  const toPath = resolve(join(__dirname, '..', 'node_modules', libName));
  const parentToDir = dirname(toPath);
  ensureDirSync(parentToDir);

  if (existsSync(resolve(fromPath))) {
    try {
      symlinkSync(fromPath, toPath, 'junction');
    } catch (e) {}
  } else {
    console.log('from path does not exist ', fromPath);
  }
}
