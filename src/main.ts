import './polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
// import './test/jasmine-setup';
// import 'jasmine-core/lib/jasmine-core/jasmine-html.js';
//import 'jasmine-core/lib/jasmine-core/boot.js';
// import './test.ts';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((ref) => {
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef']) {
      window['ngRef'].destroy();
    }
    window['ngRef'] = ref;

    // Otherwise, log the boot error
  })
  .catch((err) => console.error(err));

// (function bootstrap() {
//   if (window['jasmineRef']) {
//     location.reload();

//     return;
//   }

//   window.onload(new Event('anything'));
//   window['jasmineRef'] = jasmine.getEnv();
// })();
