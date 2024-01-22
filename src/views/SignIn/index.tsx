import { ReactElement } from "react";
import reactLogo from "@/assets/react.svg";
import AuthForm from "./components/AuthForm";
import { useFormatMessage } from "@/hooks/useFormatMessage";

const SignIn = (): ReactElement => {
  const getMessage = useFormatMessage();

  return (
    <div className="p-4 rounded-lg w-96 flex flex-col items-center justify-center">
      <h2 className="text-2xl">{getMessage("welcome")}</h2>
      <img src={reactLogo} className="my-4 h-12 w-12" />
      <h1 className="mb-4 text-xl font-bold">VIAR</h1>
      <AuthForm />
    </div>
  );
};

export default SignIn;
