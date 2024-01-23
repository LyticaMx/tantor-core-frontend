import { FolderIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { ReactNode, useState } from "react";

interface Props {
  name: string;
  selected?: boolean;
  children?: ReactNode[];
}

const Folder = (props: Props) => {
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <div>
      <button
        className={clsx(
          "w-full py-1 px-2 rounded-lg flex gap-2 items-center hover:bg-purple-100 transition-background",
          props.selected && "bg-purple-600 bg-opacity-15"
        )}
        onClick={() => setExpand((val) => !val)}
      >
        <span>
          <FolderIcon className="w-4 h-4" />
        </span>
        {props.name}
      </button>
      {expand && props.children && (
        <section className="pl-2">{props.children}</section>
      )}
    </div>
  );
};

export default Folder;
