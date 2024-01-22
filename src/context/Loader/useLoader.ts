import { useContext } from "react";
import { LoaderContextType } from "./types";
import { LoaderContext } from "./LoaderContext";

export const useLoader = (): LoaderContextType => useContext(LoaderContext);
