import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Input, useDisclosure } from "@nextui-org/react";
import RecordsList from "./components/RecordsList";
import RecordModal from "./components/RecordModal";
import { useFormatMessage } from "@/hooks/useFormatMessage";
import { messages } from "./messages";

const RecordsSidebar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const getMessage = useFormatMessage(messages);

  return (
    <div>
      <Input
        className="text-lg"
        type="text"
        placeholder={getMessage("searchRecord")}
        startContent={
          <MagnifyingGlassIcon className="w-4 h-4 text-default-400 pointer-events-none flex-shrink-0" />
        }
      />
      <div className="mt-4 mb-2 flex justify-between items-center">
        <h2 className="text-lg font-semibold">{getMessage("records")}</h2>
        <button
          className="text-primary p-2 rounded-full bg-opacity-10 bg-primary hover:bg-opacity-30"
          onClick={onOpen}
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
      <div>
        <RecordsList />
      </div>
      <RecordModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default RecordsSidebar;
