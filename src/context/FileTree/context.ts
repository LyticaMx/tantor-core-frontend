import { Context, createContext } from "react";
import { TreeContextType } from "./types";

const initialState: TreeContextType = {
  activeNode: null,
  files: [],
};

export const FileTreeContext: Context<TreeContextType> =
  createContext(initialState);
