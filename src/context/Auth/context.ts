import { getItem } from "@/utils/persistentStorage";
import { Auth, ContextType } from "./types";
import { Context, createContext } from "react";

export const initialState: Auth = {
  isLoggedIn: false,
  token: getItem("token"),
  rToken: getItem("rToken"),
  profile: {
    name: "",
  },
};

export const AuthContext: Context<ContextType> = createContext({
  auth: initialState,
});
