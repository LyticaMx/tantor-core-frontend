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
  path: string;
  name: string;
  type: FileType;
  level: number;
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
        props.path === props.activeNode?.path && "bg-purple-600 bg-opacity-15"
      )}
      onClick={() =>
        props.onClick({
          path: props.path,
          content: "",
          isDirectory: false,
          name: props.name,
          type: props.type,
          level: props.level,
        })
      }
    >
      <p className="flex items-center gap-2 break-keep">
        <span className="block">
          <Image className="w-4 h-4" />
        </span>
        <span className="flex-shrink-0">{props.name}</span>
      </p>
    </div>
  );
};

export default File;
