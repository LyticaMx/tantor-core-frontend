import { TreeNode } from "@/context/FileTree/types";
import { FolderIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import File from "./File";

interface Props {
  id: string;
  path: string;
  name: string;
  nodes?: TreeNode[];
  level: number;
  onClick: (node: TreeNode) => void;
  activeNode: TreeNode | null;
}

const Folder = (props: Props) => {
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <div className="flex-0">
      <button
        className={clsx(
          "w-full py-1 px-2 rounded-lg flex gap-2 items-center hover:bg-purple-100 transition-background",

          props.path === props.activeNode?.path && "bg-purple-600 bg-opacity-15"
        )}
        onClick={() => {
          if (!expand) {
            props.onClick({
              id: props.id,
              path: props.path,
              content: [],
              isDirectory: true,
              name: props.name,
              level: props.level,
            });
          }
          setExpand((val) => !val);
        }}
      >
        <span>
          <FolderIcon className="w-4 h-4" />
        </span>
        {props.name}
      </button>
      {expand && props.nodes && (
        <section
          className={clsx(
            "pl-2 flex flex-col gap-1",
            props.nodes.length > 0 && " pt-1"
          )}
        >
          {props.nodes.map((node) =>
            node.isDirectory ? (
              <Folder
                key={node.id}
                path={node.path}
                id={node.id}
                name={node.name}
                onClick={props.onClick}
                nodes={node.content}
                activeNode={props.activeNode}
                level={node.level}
              />
            ) : (
              <File
                key={node.path}
                path={node.path}
                name={node.name}
                onClick={props.onClick}
                activeNode={props.activeNode}
                type={node.type}
                level={node.level}
              />
            )
          )}
        </section>
      )}
    </div>
  );
};

export default Folder;
