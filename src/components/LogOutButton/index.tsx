import { useFormatMessage } from "@/hooks/useFormatMessage";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { messages } from "./messages";
import { useAuth } from "@/context/Auth";

export const LogOutButton = () => {
  const getMessage = useFormatMessage(messages);
  const { actions } = useAuth();

  return (
    <div className="fixed left-0 bottom-6">
      <div className="min-w-2 max-w-2 overflow-hidden group hover:min-w-24 hover:max-w-lg hover:px-2 hover:cursor-pointer transition-[min-width,max-width] h-10 bg-red-500 ">
        <button
          className="flex items-center gap-2 h-full"
          onClick={() => actions?.signOut()}
        >
          <ArrowLeftStartOnRectangleIcon className="opacity-0 group-hover:transition-[opacity] group-hover:duration-150 group-hover:delay-[50ms] transition group-hover:opacity-100 text-white w-5 h-5 flex-shrink-0" />
          <p className="opacity-0 group-hover:transition-[opacity] group-hover:duration-150 group-hover:delay-[50ms] group-hover:opacity-100 text-white flex-shrink-0">
            {getMessage("closeSession")}
          </p>
        </button>
      </div>
    </div>
  );
};
