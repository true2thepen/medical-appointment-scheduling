/*
 * Angular bootstraping
 */
import { platformBrowserDynamic }  from '@angular/platform-browser-dynamic';
import { getTranslationProviders } from './app/i18n-providers';
import { decorateModuleRef }       from './app/environment';
import { bootloader }              from '@angularclass/hmr';
/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule }               from './app/app.module';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main() {
  getTranslationProviders()
    .then(providers => {
      const options = { providers };

      platformBrowserDynamic()
        .bootstrapModule(AppModule, options)
        .then(decorateModuleRef)
        .catch(err => console.error(err));
    })
    .catch(err => {
      console.log('Could not load translations. Launching without I18n.');
      platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .then(decorateModuleRef)
        .catch(err => console.error(err));
    });
}

// needed for hmr
// in prod this is replace for document ready
main();
