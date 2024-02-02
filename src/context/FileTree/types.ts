import { FileType } from "@/types/FileType";

export interface FileNode {
  id: string;
  name: string;
  content: string;
  type: FileType;
  isDirectory: false;
  level: number;
}

export interface DirectoryNode {
  id: string;
  name: string;
  content: TreeNode[];
  isDirectory: true;
  level: number;
}

export type TreeNode = FileNode | DirectoryNode;

export interface TreeContextType {
  activeNode: TreeNode | null;
  files: TreeNode[];
  actions?: {
    getFiles: (record: string) => Promise<void>;
    uploadFile: (
      file: File,
      isRootChild: boolean,
      parent?: string
    ) => Promise<boolean>;
    createDirectory: (
      name: string,
      isRootChild: boolean,
      parent?: string
    ) => Promise<boolean>;
    setActiveNode: (node?: TreeNode) => void;
  };
}
