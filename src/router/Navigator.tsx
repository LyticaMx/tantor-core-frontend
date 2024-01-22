import { ReactElement } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { paths, routes } from "./routes";
import { useAuth } from "@/context/Auth";

const Navigator = (): ReactElement => {
  const { auth } = useAuth();
  return (
    <Switch>
      {routes.map((route) => (
        <Route exact key={route.id} path={route.path}>
          {route.private && !auth.isLoggedIn ? (
            <Redirect to={paths.auth} />
          ) : (
            <route.layout>
              <route.component />
            </route.layout>
          )}
        </Route>
      ))}
      <Redirect to={auth.isLoggedIn ? paths.events : paths.auth} />
    </Switch>
  );
};

export default Navigator;
