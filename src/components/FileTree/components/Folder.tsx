import { TreeNode } from "@/context/FileTree/types";
import { FolderIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import File from "./File";

interface Props {
  id: string;
  name: string;
  nodes?: TreeNode[];
  onClick: (node: TreeNode) => void;
  activeNode: TreeNode | null;
}

const Folder = (props: Props) => {
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <div>
      <button
        className={clsx(
          "w-full py-1 px-2 rounded-lg flex gap-2 items-center hover:bg-purple-100 transition-background",
          props.id === props.activeNode?.id && "bg-purple-600 bg-opacity-15"
        )}
        onClick={() => {
          setExpand((val) => !val);
          props.onClick({
            id: props.id,
            content: [],
            isDirectory: true,
            name: props.name,
          });
        }}
      >
        <span>
          <FolderIcon className="w-4 h-4" />
        </span>
        {props.name}
      </button>
      {expand && props.nodes && (
        <section className="pl-2 flex flex-col gap-1">
          {props.nodes.map((node) =>
            node.isDirectory ? (
              <Folder
                key={node.id}
                id={node.id}
                name={node.name}
                onClick={props.onClick}
                nodes={node.content}
                activeNode={props.activeNode}
              />
            ) : (
              <File
                key={node.id}
                id={node.id}
                name={node.name}
                onClick={props.onClick}
                activeNode={props.activeNode}
                type={node.type}
              />
            )
          )}
        </section>
      )}
    </div>
  );
};

export default Folder;
