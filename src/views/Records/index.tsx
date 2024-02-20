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
import { useFileTree } from "@/context/FileTree/useFileTree";
import FileTree from "@/components/FileTree";
import RecordsSidebar from "@/components/RecordsSidebar";
import { FC, ReactNode, useMemo } from "react";
import { useRecords } from "@/context/Records";
import NoData from "@/components/NoData";

/* Archivos demo */
import demoPDF from "@/demo/demo-text.pdf";
import demoAudio from "@/demo/demo-audio.wav";
import demoImage from "@/demo/demo-imagen.jpeg";
import demoVideo from "@/demo/demo-video.mp4";
import { Image } from "@nextui-org/react";

interface NodeData {
  Icon: FC<any>;
  Preview: ReactNode;
}

const Records = () => {
  const { activeRecord } = useRecords();
  const { activeNode } = useFileTree();

  const Node = useMemo<NodeData | null>((): NodeData | null => {
    if (!activeNode || activeNode.isDirectory) return null;

    switch (activeNode.type) {
      case FileType.AUDIO:
        return {
          Icon: SpeakerWaveIcon,
          Preview: (
            <div className="flex items-center justify-center  h-[91vh]">
              <audio src={demoAudio} controls />
            </div>
          ),
        };
      case FileType.IMAGE:
        return {
          Icon: PhotoIcon,
          Preview: (
            <div className="flex items-center justify-center">
              <Image src={demoImage} className="max-h-[91vh]" />
            </div>
          ),
        };
      case FileType.TEXT:
      case FileType.PDF:
        return {
          Icon: DocumentTextIcon,
          Preview: (
            <embed
              src={demoPDF}
              type="application/pdf"
              className="w-full h-[91vh]"
            />
          ),
        };
      case FileType.VIDEO:
        return {
          Icon: VideoCameraIcon,
          Preview: (
            <div className="flex items-center justify-center max-h-[91vh]">
              <video controls>
                <source src={demoVideo} />
              </video>
            </div>
          ),
        };
      default:
        return { Icon: DocumentIcon, Preview: <div /> };
    }
  }, [activeNode]);

  return (
    <div className="h-[100cqh] overflow-y-hidden grid grid-cols-5">
      <div className="overflow-auto p-4 px-6 border-r border-r-gray-300">
        <RecordsSidebar />
      </div>
      <div className="overflow-auto p-4 px-6 border-r border-r-gray-300">
        {activeRecord ? (
          <FileTree />
        ) : (
          <div className="flex items-center h-full">
            <NoData />
          </div>
        )}
      </div>
      <div className="overflow-auto p-4 px-6 col-span-3">
        {activeNode && !activeNode.isDirectory && Node ? (
          <main className="max-h-full">
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {<Node.Icon className="w-5 h-5" />}
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
            <section className="mt-4">{Node.Preview}</section>
          </main>
        ) : (
          <div className="flex items-center h-full">
            <NoData />
          </div>
        )}
      </div>
    </div>
  );
};

export default Records;
