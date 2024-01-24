import { Context, createContext } from "react";
import { RecordsContextType } from "./types";

const initialState: RecordsContextType = {
  activeRecord: null,
  records: [],
};

export const RecordsContext: Context<RecordsContextType> =
  createContext(initialState);
