import { DirectoryNode, TreeNode } from "@/context/FileTree/types";
import { FolderIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import File from "./File";

interface Props {
  node: DirectoryNode;
  onClick: (node: TreeNode) => void;
  activeNode: TreeNode | null;
}

const Folder = (props: Props) => {
  const { content: nodes, path, name } = props.node;
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <div className="flex-shrink-0">
      <button
        className={clsx(
          "w-full py-1 px-2 rounded-lg flex gap-2 items-center hover:bg-purple-100 transition-background",
          path === props.activeNode?.path && "bg-purple-600 bg-opacity-15"
        )}
        onClick={() => {
          props.onClick(props.node);
          setExpand((val) => !val);
        }}
      >
        <span>
          <FolderIcon className="w-4 h-4" />
        </span>
        {name}
      </button>
      {expand && nodes && (
        <section
          className={clsx(
            "pl-2 flex flex-col gap-1",
            nodes.length > 0 && " pt-1"
          )}
        >
          {nodes.map((node) =>
            node.isDirectory ? (
              <Folder
                key={node.id}
                node={node}
                onClick={props.onClick}
                activeNode={props.activeNode}
              />
            ) : (
              <File
                key={node.path}
                node={node}
                onClick={props.onClick}
                activeNode={props.activeNode}
              />
            )
          )}
        </section>
      )}
    </div>
  );
};

export default Folder;
