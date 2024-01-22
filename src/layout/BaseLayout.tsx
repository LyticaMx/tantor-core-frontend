import Sidebar from "@/components/Sidebar";
import { ReactElement } from "react";

interface Props {
  children: ReactElement;
}

const BaseLayout = (props: Props) => {
  const { children } = props;
  return (
    <div className="h-screen overflow-y-hidden">
      <Sidebar />
      <div className="ml-14 mt-8 flex-1 overflow-y-auto overflow-x-hidden bg-background">
        <main className="min-h-full h-fit">
          <div className="py-6">
            <div className="mx-auto px-4 sm:px-6 md:px-8 py-4">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;
