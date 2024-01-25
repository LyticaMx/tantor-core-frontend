import { FileType } from "@/types/FileType";
import {
  DocumentIcon,
  DocumentTextIcon,
  EllipsisHorizontalIcon,
  InformationCircleIcon,
  PhotoIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import demoPDF from "@/demo/transcription.pdf";
import { useFileTree } from "@/context/FileTree/useFileTree";

const Records = () => {
  const { activeNode } = useFileTree();

  if (!activeNode || activeNode.isDirectory) return null;

  const getImage = (type?: FileType) => {
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
  };

  const Image = getImage(activeNode?.type);

  return (
    <main className="max-h-full">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image className="w-5 h-5" />
          <h3>{activeNode?.name ?? ""}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button className="transition-[color] hover:text-primary">
            <InformationCircleIcon className="w-5 h-5" />
          </button>
          <button className="transition-[color] hover:text-primary">
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </button>
        </div>
      </header>
      <section className="mt-4 h-[96%]">
        <embed
          src={demoPDF}
          type="application/pdf"
          className="w-full h-[91vh]"
        />
      </section>
    </main>
  );
};

export default Records;
