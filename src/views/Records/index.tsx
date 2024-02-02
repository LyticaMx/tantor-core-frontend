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
import FileTree from "@/components/FileTree";
import RecordsSidebar from "@/components/RecordsSidebar";
import { useMemo } from "react";

const Records = () => {
  const { activeNode } = useFileTree();

  const Image = useMemo(() => {
    if (!activeNode || activeNode.isDirectory) return null;

    switch (activeNode.type) {
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
  }, [activeNode]);

  return (
    <div className="h-[100cqh] overflow-y-hidden grid grid-cols-5">
      <div className="overflow-auto p-4 px-6 border-r border-r-gray-300">
        <RecordsSidebar />
      </div>
      <div className="overflow-auto p-4 px-6 border-r border-r-gray-300">
        <FileTree />
      </div>
      <div className="overflow-auto p-4 px-6 col-span-3">
        {activeNode && !activeNode.isDirectory && (
          <main className="max-h-full">
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {Image && <Image className="w-5 h-5" />}
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
            <section className="mt-4">
              <embed
                src={demoPDF}
                type="application/pdf"
                className="w-full h-[91vh]"
              />
            </section>
          </main>
        )}
      </div>
    </div>
  );
};

export default Records;
