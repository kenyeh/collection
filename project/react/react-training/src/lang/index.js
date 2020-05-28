import i18n from 'i18next';
import Cookies from 'js-cookie';
import { initReactI18next } from 'react-i18next';

import enLocale from './en';
import zhTWLocale from './zh_TW';

const resources = {
  en: {
    ...enLocale,
  },
  zh_TW: {
    ...zhTWLocale,
  },
};

export function getLanguage() {
  const chooseLanguage = Cookies.get('language');
  if (chooseLanguage) return chooseLanguage;

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).slice(0, 2).toLowerCase();
  const locales = Object.keys(resources);

  return locales.find((locale) => language.indexOf(locale.slice(0, 2).toLowerCase()) > -1) || 'en';
}

i18n
  .use(initReactI18next)
  .init({
    lng: getLanguage(),
    fallbackLng: 'en',
    whitelist: ['en', 'zh_TW'],
    nonExplicitWhitelist: true,
    load: 'all',
    debug: process.env.REACT_APP_I18N_DEBUG,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    resources,
  });

export default i18n;
