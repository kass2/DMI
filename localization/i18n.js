import * as Localization from "expo-localization";
import i18n from "i18n-js";

//Import locales
import en from "./translations/en.json"
import es from "./translations/es.json"

//Set key values for different laguages you want to support.
i18n.translations = {
    en,
    es
};

//Set the local once at the beginning of your app.
i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default i18n;