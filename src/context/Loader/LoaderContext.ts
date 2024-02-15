import { Context, createContext, createRef } from "react";
import { LoaderContextType } from "./types";

const initialState: LoaderContextType = { show: false };

export const LoaderContext: Context<LoaderContextType> =
  createContext(initialState);

export const LoaderContextRef = createRef<LoaderContextType>();
