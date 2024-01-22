import { useContext } from "react";
import { LanguageContextType } from "./types";
import { LanguageContext } from "./context";

export const useLanguage = (): LanguageContextType =>
  useContext(LanguageContext);
