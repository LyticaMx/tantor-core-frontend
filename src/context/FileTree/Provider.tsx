import { ReactElement, ReactNode, useMemo, useState } from "react";
import { DirectoryNode, FileNode, TreeContextType, TreeNode } from "./types";
import { FileTreeContext } from "./context";
import { useApolloClient } from "@apollo/client";
import {
  CREATE_FOLDER,
  GET_FOLDER,
  UPLOAD_FILE,
} from "./queries/fileTree.graphql";
import { FileType } from "@/types/FileType";
import { useRecords } from "../Records";

interface Props {
  children: ReactNode;
}

const FileTreeProvider = ({ children }: Props): ReactElement => {
  const [activeNode, setActiveNode] = useState<TreeNode | null>(null);
  const [files, setFiles] = useState<TreeNode[]>([]);
  const { activeRecord } = useRecords();
  const client = useApolloClient();

  const createDirectory = async (
    name: string,
    isRootChild: boolean,
    parent?: string
  ): Promise<boolean> => {
    try {
      const variables = isRootChild
        ? { name, caseId: activeRecord?.id }
        : { name, folderId: parent };

      const response = await client.mutate({
        mutation: CREATE_FOLDER,
        variables,
        refetchQueries: [
          {
            query: GET_FOLDER,
            variables: isRootChild
              ? { caseId: activeRecord?.id }
              : { id: parent },
          },
        ],
      });

      const createdNode: DirectoryNode = {
        isDirectory: true,
        content: [],
        id: response.data?.createFolder?.mongoId,
        name: response.data?.createFolder?.name,
        level: -1,
      };

      if (isRootChild) {
        setFiles((files) => [...files, createdNode]);
      } else {
        setFiles((files) => {
          const updated = [...files];
          for (
            let inserted = false, i = 0;
            !inserted && i < updated.length;
            i++
          ) {
            inserted = insertNodeInTree(
              updated[i],
              parent ?? "",
              [createdNode],
              0
            );
          }
          return updated;
        });
      }

      return true;
    } catch {
      return false;
    }
  };

  const uploadFile = async (
    file: File,
    isRootChild: boolean,
    parent?: string
  ): Promise<boolean> => {
    try {
      const variables = isRootChild
        ? { file, caseId: activeRecord?.id }
        : { file, folderId: parent };
      const response = await client.mutate({
        mutation: UPLOAD_FILE,
        variables,
        refetchQueries: [
          {
            query: GET_FOLDER,
            variables: isRootChild
              ? { caseId: activeRecord?.id }
              : { id: parent },
          },
        ],
      });
      const createdNode: FileNode = {
        isDirectory: false,
        content: "",
        id: response.data?.uploadFile?.mongoId,
        name: response.data?.uploadFile?.name,
        type: FileType.UNKNOWN,
        level: -1,
      };
      if (isRootChild) {
        setFiles((files) => [...files, createdNode]);
      } else {
        setFiles((files) => {
          const updated = [...files];
          for (
            let inserted = false, i = 0;
            !inserted && i < updated.length;
            i++
          ) {
            inserted = insertNodeInTree(
              updated[i],
              parent ?? "",
              [createdNode],
              0
            );
          }
          return updated;
        });
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const createTree = (node: {
    files: any[] | null;
    subfolders: any[] | null;
    level: number;
  }) => {
    if (!node.files && !node.subfolders) return [];
    let tree: TreeNode[] = [];
    if (node.subfolders) {
      tree = node.subfolders.map((subfolder) => ({
        id: subfolder.mongoId,
        isDirectory: true,
        content: [],
        name: subfolder.name,
        level: node.level + 1,
      }));
    }
    if (node.files) {
      tree = tree.concat(
        node.files.map((file) => ({
          isDirectory: false,
          content: "",
          id: file.mongoId,
          name: file.name,
          type: FileType.UNKNOWN,
          level: node.level + 1,
        }))
      );
    }
    return tree;
  };

  const insertNodeInTree = (
    node: TreeNode,
    father: string,
    nodesToInsert: TreeNode[],
    level: number,
    hard: boolean = false
  ): boolean => {
    if (!node.isDirectory) return false;
    if (node.id === father) {
      const nodes = nodesToInsert.map((node) => {
        node.level = level + 1;
        return node;
      });
      if (!hard) node.content = node.content.concat(nodes);
      else node.content = nodes;
      return true;
    } else {
      for (const child of node.content) {
        if (insertNodeInTree(child, father, nodesToInsert, level + 1, hard))
          return true;
      }
    }
    return false;
  };

  const getFiles = async (record: string, level: number = 0): Promise<void> => {
    try {
      const isRootFolder = level === 0;
      const variables = isRootFolder ? { caseId: record } : { id: record };
      const response = await client.query({
        query: GET_FOLDER,
        variables,
      });
      if (isRootFolder) {
        setFiles(
          (response.data?.getFolders?.edges as any[]).map((edge) =>
            edge.node.__typename === "Folder" ||
            edge.node.__typename === "SubFolder"
              ? {
                  isDirectory: true,
                  id: edge.node.mongoId,
                  name: edge.node.name,
                  content: createTree({ ...edge.node, level: 0 }), // TODO: Agregar lvl
                  level,
                }
              : {
                  isDirectory: false,
                  id: edge.node.mongoId,
                  name: edge.node.name,
                  content: "",
                  type: FileType.TEXT,
                  level,
                }
          ) ?? []
        );
      } else {
        setFiles((files) => {
          const updated = [...files];
          for (
            let inserted = false, i = 0;
            !inserted && i < updated.length;
            i++
          ) {
            inserted = insertNodeInTree(
              updated[i],
              record,
              createTree(
                response.data?.getFolders?.edges?.[0]?.node ?? {
                  files: null,
                  level: -1,
                  subfolders: null,
                }
              ),
              0,
              true
            );
          }
          return updated;
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const setActive = async (node?: TreeNode) => {
    if (node) {
      if (node.isDirectory && node.level >= 1) {
        try {
          await getFiles(node.id, node.level);
        } catch (e) {
          console.error(e);
        }
      }
      setActiveNode(node);
    } else setActiveNode(null);
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
