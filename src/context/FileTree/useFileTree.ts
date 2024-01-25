import { useContext } from "react";
import { TreeContextType } from "./types";
import { FileTreeContext } from "./context";

export const useFileTree = (): TreeContextType => useContext(FileTreeContext);
