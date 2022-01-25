import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

//Traduction EN
import homeEN from './translations/en/home.json';
import onBoardingEN from './translations/en/onBoarding.json';
import buttonEN from './translations/en/button.json';
import menuEN from './translations/en/menu.json';
import deliverEN from './translations/en/deliver.json';

//Traduction FR
import homeFR from './translations/fr/home.json';
import onBoardingFR from './translations/fr/onBoarding.json';
import buttonFR from './translations/fr/button.json';
import menuFR from './translations/fr/menu.json';
import deliverFR from './translations/fr/deliver.json';

//Import Detector Language
const { languageDetectorPlugin } = require('./languageDetectorPlugin');

//Resources Translation
const resources = {
  fr: {
    translation: homeFR,
    onBoarding: onBoardingFR,
    menu: menuFR,
    button: buttonFR,
    deliver: deliverFR,
  },
  en: {
    translation: homeEN,
    onBoarding: onBoardingEN,
    menu: menuEN,
    button: buttonEN,
    deliver: deliverEN,
  },
};

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    resources,
    //language to use if translations in user language are not available
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });

export default i18n;
