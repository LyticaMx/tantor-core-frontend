import { Context, createContext } from "react";
import { LanguageContextType } from "./types";

export const initialState: LanguageContextType = {
  localeI18n: "es-mx",
};

export const LanguageContext: Context<LanguageContextType> =
  createContext(initialState);
