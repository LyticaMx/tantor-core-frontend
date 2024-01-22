import { getItem, setItem } from "@/utils/persistentStorage";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { LanguageContext, initialState } from "./context";
import { LanguageContextType, LocaleI18n, LocaleType } from "./types";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import { IntlProvider } from "react-intl";
import { translations } from "@/translations";

interface Props {
  children: ReactElement;
}

const LanguageProvider = (props: Props): ReactElement => {
  const { children } = props;
  const localeI18nJSON: Record<LocaleType, LocaleI18n> = {
    en: "en",
    es: "es-mx",
  };

  const localLang = getItem("lang") as string;

  const [localeI18n, setLocaleI18n] = useState<LocaleI18n>(
    (localeI18nJSON[localLang] ?? initialState.localeI18n) as LocaleI18n
  );

  const changeLocale = (newLocale: LocaleType): void => {
    setLocaleI18n(localeI18nJSON[newLocale]);
    setItem("lang", newLocale);
  };

  const contextValue = useMemo<LanguageContextType>(
    () => ({
      localeI18n,
      actions: {
        changeLocale,
      },
    }),
    [localeI18n]
  );

  useEffect(() => {
    dayjs.locale(localeI18n);
  }, [localeI18n]);

  return (
    <LanguageContext.Provider value={contextValue}>
      <IntlProvider locale={localeI18n} messages={translations[localeI18n]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export { LanguageProvider };
