import { ReactElement } from "react";
import { sidebarMessages } from "../messages/sidebar";
import SignIn from "../views/SignIn";
import AuthLayout from "../layout/AuthLayout";
import BaseLayout from "../layout/BaseLayout";

interface Layout {
  children: ReactElement;
}

export interface Route {
  id: string;
  i18key?: keyof typeof sidebarMessages;
  i18ModuleKey?: keyof typeof sidebarMessages;
  path: string;
  icon?: any;
  component: () => ReactElement;
  layout: ({ children }: Layout) => ReactElement;
  private?: boolean;
  sidebar?: boolean;
}

export const paths = {
  auth: "/inicio-de-sesion",
  events: "/eventos",
  cameras: "/camaras",
};
export const routes: Route[] = [
  {
    id: "sign-in",
    path: paths.auth,
    component: SignIn,
    layout: AuthLayout,
  },
];
