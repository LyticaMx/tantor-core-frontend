import { ReactElement, ReactNode, useMemo, useState } from "react";
import { TreeContextType, TreeNode } from "./types";
import { useLoader } from "../Loader";
import { FileTreeContext } from "./context";
import { FileType } from "@/types/FileType";

interface Props {
  children: ReactNode;
}

const FileTreeProvider = ({ children }: Props): ReactElement => {
  const [activeNode, setActiveNode] = useState<TreeNode | null>(null);
  const [files, setFiles] = useState<TreeNode[]>([]);
  const { actions } = useLoader();

  const createDirectory = async (
    name: string,
    parent?: string
  ): Promise<boolean> => {
    try {
      actions?.addPendingActions();
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 3000);
      });
      actions?.removePendingActions();

      return true;
    } catch {
      return false;
    }
  };

  const uploadFile = async (file: File, parent?: string): Promise<boolean> => {
    try {
      actions?.addPendingActions();
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 3000);
      });
      actions?.removePendingActions();

      return true;
    } catch {
      return false;
    }
  };

  const getFiles = async (record: string): Promise<void> => {
    try {
      actions?.addPendingActions();
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 3000);
      });
      setFiles([
        {
          isDirectory: false,
          content: "",
          id: "1",
          name: "Fotografía-1023-12345-1",
          type: FileType.IMAGE,
        },
        {
          isDirectory: false,
          content: "",
          id: "2",
          name: "Fotografía-1023-12345-2",
          type: FileType.IMAGE,
        },
        {
          id: "3",
          isDirectory: true,
          content: [
            {
              id: "4",
              isDirectory: false,
              content: "",
              name: "Video-sin-etiquetar-2",
              type: FileType.VIDEO,
            },
            {
              id: "5",
              isDirectory: false,
              content: "",
              name: "Video-sin-etiquetar-3",
              type: FileType.VIDEO,
            },
          ],
          name: "Videos por la mañana",
        },
        {
          id: "6",
          isDirectory: true,
          content: [],
          name: "Videos por la tarde",
        },
        {
          id: "7",
          isDirectory: false,
          content: "",
          name: "Documento importante",
          type: FileType.PDF,
        },
        {
          id: "8",
          isDirectory: false,
          content: "",
          name: "Video-sin-etiquetar",
          type: FileType.VIDEO,
        },
        {
          id: "9",
          isDirectory: false,
          content: "",
          name: "Notas sobre el caso",
          type: FileType.TEXT,
        },
      ]);
      actions?.removePendingActions();
    } catch (e) {
      console.log(e);
    }
  };

  const setActive = (node?: TreeNode) => {
    if (node) setActiveNode(node);
    else setActiveNode(null);
  };

  const contextValue = useMemo<TreeContextType>(
    () => ({
      activeNode,
      files,
      actions: {
        createDirectory,
        getFiles,
        setActiveNode: setActive,
        uploadFile,
      },
    }),
    [files, activeNode]
  );

  return (
    <FileTreeContext.Provider value={contextValue}>
      {children}
    </FileTreeContext.Provider>
  );
};

export { FileTreeProvider };
