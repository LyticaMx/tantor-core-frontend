import {
  ReactElement,
  ReactNode,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import { useLoader } from "../Loader";
// import { toast } from "react-toastify";
// import { useFormatMessage } from "@/hooks/useFormatMessage";
import { Auth, ContextType, SignIn } from "./types";
import { AuthContext, AuthContextRef, initialState } from "./context";
import { paths } from "@/router/routes";
import useApi from "@/hooks/useApi";
import { removeItem, setItem } from "@/utils/persistentStorage";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useFormatMessage } from "@/hooks/useFormatMessage";

interface Props {
  children: ReactNode;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

const AuthProvider = (props: Props): ReactElement => {
  const { children } = props;
  const history = useHistory();
  const { actions: loaderActions } = useLoader();
  const getMessage = useFormatMessage();
  const [auth, setAuth] = useState<Auth>(initialState);
  const _signIn = useApi({ endpoint: "login", base: "auth", method: "get" });

  const signIn = async (values: SignIn): Promise<void> => {
    try {
      const response = (await _signIn({
        urlParams: { username: values.email, password: values.password },
      })) as AuthResponse;

      setItem("token", response.access_token);
      setItem("rToken", response.refresh_token);

      setAuth({
        isLoggedIn: true,
        token: response.access_token,
        rToken: response.refresh_token,
        profile: {
          name: "Admin",
        },
      });
      history.push(paths.records);
    } catch (e) {
      console.error(e);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setAuth({
        isLoggedIn: false,
        token: "",
        rToken: "",
        profile: {
          name: "Admin",
        },
      });
      history.push(paths.auth);
    } catch {}
  };

  const tokenHasExpired = (): boolean => {
    const { token } = auth;
    const session: any = jwtDecode(token); // decode your token here
    const exp = session.exp;

    if (dayjs().isAfter(dayjs(exp * 1000))) {
      return true;
    }
    return false;
  };

  const killSession = (hideNotification?: boolean): void => {
    try {
      loaderActions?.addPendingActions();
      removeItem("token");
      setAuth(initialState);

      if (!hideNotification) {
        if (tokenHasExpired()) toast.error(getMessage("sessionExpired"));
        else toast.error(getMessage("loginElsewhere"));
      }
      loaderActions?.removePendingActions();
      history.push(paths.auth);
    } catch (e) {
      console.error("Error", e);
    }
  };

  const contextValue = useMemo<ContextType>(
    () => ({
      auth,
      actions: {
        signIn,
        signOut,
        killSession,
      },
    }),
    [auth]
  );

  useImperativeHandle(AuthContextRef, () => contextValue, [contextValue]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };
