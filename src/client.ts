// the polyfills must be the first thing imported
import 'angular2-universal-polyfills';
import 'isomorphic-fetch';

// Angular 2
import { enableProdMode} from '@angular/core';
import { platformUniversalDynamic } from 'angular2-universal';

// enable prod for faster renders
enableProdMode();

import { MainModule } from './main.browser';

const platformRef = platformUniversalDynamic();

// on document ready bootstrap Angular 2
document.addEventListener('DOMContentLoaded', () => {

  platformRef.bootstrapModule(MainModule);

});
