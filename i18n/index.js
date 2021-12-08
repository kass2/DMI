import i18n, {getLanguages} from 'react-native-i18n'

import en from './en.json';
import es from './es.json';
i18n.fallbacks = true;

i18n.translations = {
    en,
    es
};

i18n.locale = i18n.currentLocale();
i18n.fallbacks = true;
export default i18n;