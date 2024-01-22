import { routes } from "@/router/routes";
import {
  ArrowLeftStartOnRectangleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import logo from "@/assets/react.svg";
import { Tooltip } from "@nextui-org/react";
import { useFormatMessage } from "@/hooks/useFormatMessage";
import { useAuth } from "@/context/Auth";

const Sidebar = (): ReactElement => {
  const getMessage = useFormatMessage();
  const { actions } = useAuth();

  return (
    <aside className="flex flex-col items-center justify-between h-screen py-8 bg-white border-r rtl:border-l rtl:border-r-0 rounded-r-2xl absolute inset-y-0 left-0 z-20 shadow-lg w-14">
      <div className="flex items-center justify-center flex-col">
        <img src={logo} />
        <span className="font-semibold">VIAR</span>
      </div>
      <nav className="flex flex-col flex-1 space-y-2 items-center mt-8">
        {routes
          .filter((route) => route.sidebar)
          .map((route) => (
            <div key={route.id}>
              <Tooltip
                placement="right"
                showArrow
                color="primary"
                content={getMessage(route.i18key ?? "")}
              >
                <NavLink
                  to={route.path}
                  className="block p-1 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100 text-gray-700"
                  activeClassName="!bg-gray-100 !text-primary"
                >
                  {route.icon ? (
                    <route.icon className="h-5 w-5 m-auto" />
                  ) : (
                    <QuestionMarkCircleIcon className="h-5 w-5 m-auto" />
                  )}
                </NavLink>
              </Tooltip>
            </div>
          ))}
      </nav>
      <button className="text-red-500" onClick={actions?.signOut}>
        <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
      </button>
    </aside>
  );
};

export default Sidebar;
