import { ReactElement } from "react";

interface Props {
  children: ReactElement;
}

const AuthLayout = (props: Props) => {
  const { children } = props;
  return (
    <div className="relative flex min-h-full justify-center items-center md:px-12 lg:px-0 h-screen">
      <div className="shadow-2xl">{children}</div>
    </div>
  );
};

export default AuthLayout;
