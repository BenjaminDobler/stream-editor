import { makeEnvironmentProviders } from "@angular/core";
import { MonacoService } from "./services/monaco.service";

export function provideNGMonaco() {
    return makeEnvironmentProviders([
      { provide: MonacoService, useValue: new MonacoService() }
    ]);
  }