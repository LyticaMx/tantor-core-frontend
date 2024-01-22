import { useContext } from "react";
import { ContextType } from "./types";
import { AuthContext } from "./context";

export const useAuth = (): ContextType => useContext(AuthContext);
