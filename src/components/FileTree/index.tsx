import {
  DocumentPlusIcon,
  FolderPlusIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { Divider, useDisclosure } from "@nextui-org/react";
import File from "./components/File";
import Folder from "./components/Folder";
import FolderModal from "./components/FolderModal";
import { useRecords } from "@/context/Records";
import { useFileTree } from "@/context/FileTree/useFileTree";
import { useEffect, useRef } from "react";

const FileTree = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { activeRecord } = useRecords();
  const { files, activeNode, actions } = useFileTree();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!activeRecord?.id) return;
    actions?.setActiveNode();
    actions?.getFiles(activeRecord.root);
  }, [activeRecord]);

  return (
    <div>
      <h3 className="flex gap-2 items-center py-2">
        <InformationCircleIcon className="w-5 h-5" />
        <span className="font-medium">{activeRecord?.name ?? ""}</span>
      </h3>
      <Divider className="my-4" />
      <form className="hidden" ref={formRef}>
        <input
          id="loadFile"
          type="file"
          accept="application/pdf"
          onChange={async ({ target: { validity, files } }) => {
            if (validity.valid && files && files.length > 0) {
              const isRootChild =
                !Boolean(activeNode) || !activeNode?.isDirectory;
              await actions?.uploadFile(
                files[0],
                isRootChild,
                isRootChild ? activeRecord?.id : activeNode?.id
              );
              formRef.current?.reset();
            }
          }}
        />
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
      <div className="mt-2 flex flex-col gap-1 min-w-full w-fit">
        {files.map((node) =>
          node.isDirectory ? (
            <Folder
              key={node.id}
              node={node}
              onClick={actions?.setActiveNode ?? (() => {})}
              activeNode={activeNode}
            />
          ) : (
            <File
              key={node.path}
              node={node}
              onClick={actions?.setActiveNode ?? (() => {})}
              activeNode={activeNode}
            />
          )
        )}
      </div>
      <FolderModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default FileTree;
