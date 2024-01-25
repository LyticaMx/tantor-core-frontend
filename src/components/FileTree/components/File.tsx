import { TreeNode } from "@/context/FileTree/types";
import { FileType } from "@/types/FileType";
import {
  DocumentIcon,
  DocumentTextIcon,
  PhotoIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useMemo } from "react";

interface Props {
  id: string;
  name: string;
  type: FileType;
  onClick: (node: TreeNode) => void;
  activeNode: TreeNode | null;
}

const File = (props: Props) => {
  const Image = useMemo(() => {
    switch (props.type) {
      case FileType.AUDIO:
        return SpeakerWaveIcon;
      case FileType.IMAGE:
        return PhotoIcon;
      case FileType.TEXT:
      case FileType.PDF:
        return DocumentTextIcon;
      case FileType.VIDEO:
        return VideoCameraIcon;
      default:
        return DocumentIcon;
    }
  }, [props.type]);

  return (
    <div
      role="button"
      className={clsx(
        "py-1 px-2 rounded-lg hover:bg-purple-100 transition-background",
        props.id === props.activeNode?.id && "bg-purple-600 bg-opacity-15"
      )}
      onClick={() =>
        props.onClick({
          id: props.id,
          content: "",
          isDirectory: false,
          name: props.name,
          type: props.type,
        })
      }
    >
      <p className="flex items-center gap-2">
        <span className="block">
          <Image className="w-4 h-4" />
        </span>
        {props.name}
      </p>
    </div>
  );
};

export default File;
