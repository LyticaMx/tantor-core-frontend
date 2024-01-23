import { ReactElement, ReactNode, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLoader } from "../Loader";
// import { toast } from "react-toastify";
// import { useFormatMessage } from "@/hooks/useFormatMessage";
import { Auth, ContextType, SignIn } from "./types";
import { AuthContext, initialState } from "./context";
import { paths } from "@/router/routes";

interface Props {
  children: ReactNode;
}

const AuthProvider = (props: Props): ReactElement => {
  const { children } = props;
  const history = useHistory();
  const { actions: loaderActions } = useLoader();
  //   const getMessage = useFormatMessage();
  const [auth, setAuth] = useState<Auth>(initialState);

  const signIn = async (values: SignIn): Promise<void> => {
    try {
      console.log(values);
      loaderActions?.addPendingActions();
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2500);
      });
      setAuth({
        isLoggedIn: true,
        token: "",
        rToken: "",
        profile: {
          name: "Admin",
        },
      });
      history.push(paths.records);
    } catch (e) {
      console.error(e);
    } finally {
      loaderActions?.removePendingActions();
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

  const contextValue = useMemo<ContextType>(
    () => ({
      auth,
      actions: {
        signIn,
        signOut,
      },
    }),
    [auth]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };
