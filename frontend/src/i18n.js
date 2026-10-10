import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            language: "Eng",
            hindi: "Hindi",
            marathi: "Marathi",
            heroTitle: "Your AI-Powered Career Assistant"
        }
    },

    hi: {
        translation: {
            language: "हिं",
            hindi: "हिंदी",
            marathi: "मराठी",
            heroTitle: "आपका AI-संचालित करियर सहायक"
        }
    },

    mr: {
        translation: {
            language: "मर",
            hindi: "हिंदी",
            marathi: "मराठी",
            heroTitle: "तुमचा AI-संचालित करिअर सहाय्यक"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;