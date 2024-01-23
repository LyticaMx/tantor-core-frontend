import {
  DocumentPlusIcon,
  FolderPlusIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { Divider, useDisclosure } from "@nextui-org/react";
import File from "./components/File";
import { FileType } from "@/types/FileType";
import Folder from "./components/Folder";
import FolderModal from "./components/FolderModal";

const FileTree = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <h3 className="flex gap-2 items-center py-2">
        <InformationCircleIcon className="w-5 h-5" />
        <span className="font-medium">Caso SN 002-2012-12-23</span>
      </h3>
      <Divider className="my-4" />
      <form className="hidden">
        <input id="loadFile" type="file" accept="application/pdf" />
      </form>
      <div className="flex items-center">
        <label
          htmlFor="loadFile"
          className="inline-block cursor-pointer text-primary p-2 rounded-full hover:bg-primary-100 hover:bg-opacity-50 transition-background"
        >
          <DocumentPlusIcon className="w-5 h-5" />
        </label>
        <button
          className="text-primary p-2 rounded-full hover:bg-primary-100 hover:bg-opacity-50 transition-background"
          onClick={onOpen}
        >
          <FolderPlusIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-2">
        <File name="Fotografía-1023-12345-1" type={FileType.IMAGE} />
        <File name="Fotografía-1023-12345-2" type={FileType.IMAGE} />
        <Folder name="Videos por la mañana">
          <File name="Video-sin-etiquetar-2" type={FileType.VIDEO} />
          <File name="Video-sin-etiquetar-3" type={FileType.VIDEO} />
        </Folder>
        <Folder name="Videos por la tarde" />
        <File name="Documento importante" type={FileType.TEXT} selected />
        <File name="Video-sin-etiquetar" type={FileType.VIDEO} />
        <File name="Notas sobre el caso" type={FileType.TEXT} />
      </div>
      <FolderModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default FileTree;
