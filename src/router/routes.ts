import { ReactElement } from "react";
import { sidebarMessages } from "@/messages/sidebar";
import AuthLayout from "@/layout/AuthLayout";
import BaseLayout from "@/layout/BaseLayout";

import SignIn from "@/views/SignIn";
import Records from "@/views/Records";

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
  records: "/expedientes",
};
export const routes: Route[] = [
  {
    id: "sign-in",
    path: paths.auth,
    component: SignIn,
    layout: AuthLayout,
  },
  {
    id: "records",
    path: paths.records,
    component: Records,
    layout: BaseLayout,
  },
];
