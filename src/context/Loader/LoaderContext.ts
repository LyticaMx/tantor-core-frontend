import { Context, createContext } from "react";
import { LoaderContextType } from "./types";

const initialState: LoaderContextType = { show: false };

export const LoaderContext: Context<LoaderContextType> =
  createContext(initialState);
