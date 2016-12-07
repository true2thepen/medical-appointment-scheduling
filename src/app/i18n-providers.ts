import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';

export function getTranslationProviders(): Promise<Object[]> {

  // Get the locale id from localStorage
  const locale = localStorage.getItem('locale');

  // return no providers if fail to get translation file for locale
  const noProviders: Object[] = [];

  // No locale or U.S. English: no translation providers
  if (!locale || locale === 'en-US') {
    return Promise.resolve(noProviders);
  }

  if (locale.startsWith('de')) {
    let translationFileContents = require('raw-loader!../../locale/messages.de.xlf');
    return Promise.resolve([
        { provide: TRANSLATIONS, useValue: translationFileContents },
        { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
        { provide: LOCALE_ID, useValue: locale }
      ]);
  } else {
    return Promise.resolve(noProviders);
  }
}

declare var System: any;

function getTranslationsWithSystemJs(file: string) {
  return System.import(file + '!text'); // relies on text plugin
}
