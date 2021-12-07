import * as Localization from "expo-localization";
import i18n from "i18n-js";

//Import locales
import * as enL from "./translations/en.json"
import * as esL from "./translations/es.json"

//Set key values for different laguages you want to support.
i18n.translations = {
    en: enL,
    es: esL
};

//Set the local once at the beginning of your app.
i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default i18n;