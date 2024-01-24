import { useContext } from "react";
import { RecordsContextType } from "./types";
import { RecordsContext } from "./context";

export const useRecords = (): RecordsContextType => useContext(RecordsContext);
