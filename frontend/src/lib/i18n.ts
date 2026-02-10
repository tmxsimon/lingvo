import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en-US.json";
import ru from "../locales/ru-RU.json";
import cz from "../locales/cs-CZ.json";

export const lngResources = {
  "en-US": en,
  "ru-RU": ru,
  "cs-CZ": cz,
};

const lng = localStorage.getItem("lang") || "cs-CZ";

i18n.use(initReactI18next).init({
  resources: lngResources,
  supportedLngs: ["en-US", "ru-RU", "cs-CZ"],
  lng: lng,
  fallbackLng: "en-US",

  detection: {
    caches: ["localStorage"],
  },

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
