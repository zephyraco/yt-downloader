import intl from 'react-intl-universal';

const localeCodes = ['en', 'es', 'fr', 'hi', 'de', 'it', 'ar', 'zh', 'nl'];
const locales = {};

const loadLocaleData = Promise.all(
  localeCodes.map(code => import(`../../locales/${code}/messages.json`))
).then(modules => {
  modules.forEach((module, index) => {
    const localeCode = localeCodes[index];
    locales[localeCode] = module.default;
  });
});

export const loadLocale = locale => {
  return loadLocaleData
    .then(() => {
      return intl.init({
        currentLocale: locale,
        locales,
      });
    })
    .then(() => {
      return locales[locale];
    });
};
