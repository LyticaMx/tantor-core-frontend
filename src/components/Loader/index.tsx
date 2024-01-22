import { ReactElement } from "react";
import loader from "./loader.module.css";
import { useLoader } from "@/context/Loader";
import clsx from "clsx";
import { zIndex } from "@/constants/classes";

const Loader = (): ReactElement => {
  const { show } = useLoader();

  return (
    <div
      className={clsx(
        "fixed top-0 w-screen h-screen bg-opacity-50 bg-black justify-center items-center",
        show ? "flex" : "hidden"
      )}
      style={{ zIndex: zIndex.loader }}
    >
      <div className={loader["lds-ripple"]}>
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loader;
