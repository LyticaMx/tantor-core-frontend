import { FileNode, TreeNode } from "@/context/FileTree/types";
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
  node: FileNode;
  onClick: (node: TreeNode) => void;
  activeNode: TreeNode | null;
}

const File = (props: Props) => {
  const { path, name, type } = props.node;
  const Image = useMemo(() => {
    switch (type) {
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
  }, [type]);

  return (
    <div
      role="button"
      className={clsx(
        "py-1 px-2 rounded-lg hover:bg-purple-100 transition-background",
        path === props.activeNode?.path && "bg-purple-600 bg-opacity-15"
      )}
      onClick={() => props.onClick(props.node)}
    >
      <p className="flex items-center gap-2 break-keep w-max">
        <span className="block">
          <Image className="w-4 h-4" />
        </span>
        <span className="flex-shrink-0">{name}</span>
      </p>
    </div>
  );
};

export default File;
