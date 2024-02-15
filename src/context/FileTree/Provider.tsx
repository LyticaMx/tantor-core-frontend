import { ReactElement, ReactNode, useMemo, useState } from "react";
import { DirectoryNode, FileNode, TreeContextType, TreeNode } from "./types";
import { FileTreeContext } from "./context";
import { useApolloClient } from "@apollo/client";
import {
  CREATE_FOLDER,
  GET_FOLDER,
  UPLOAD_FILE,
} from "./queries/fileTree.graphql";
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
      const variables = {
        name,
        folderId: isRootChild ? activeRecord?.root : parent,
      };
      const response = await client.mutate({
        mutation: CREATE_FOLDER,
        variables,
        refetchQueries: [
          {
            query: GET_FOLDER,
            variables: { id: isRootChild ? activeRecord?.root : parent },
          },
        ],
      });

      const createdNode: DirectoryNode = {
        isDirectory: true,
        content: [],
        path: `/${response.data?.createFolder?.name}`,
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
              updated[i].level,
              updated[i].path
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
      const response = await client.mutate({
        mutation: UPLOAD_FILE,
        variables: {
          files: [
            {
              file,
              folderId: isRootChild ? activeRecord?.root : parent,
            },
          ],
        },
        refetchQueries: [
          {
            query: GET_FOLDER,
            variables: { id: isRootChild ? activeRecord?.root : parent },
          },
        ],
      });
      const createdNodes: FileNode[] = response.data?.uploadFile?.map(
        (node) => ({
          isDirectory: false,
          content: "",
          name: node.name,
          type: node.type,
          level: -1,
        })
      );

      if (isRootChild) {
        setFiles((files) => [...files, ...createdNodes]);
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
              createdNodes,
              updated[i].level,
              updated[i].path
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
    parent: string;
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
        path: `${node.parent}/${subfolder.name}`,
      }));
    }
    if (node.files) {
      tree = tree.concat(
        node.files.map<FileNode>((file) => ({
          isDirectory: false,
          content: "",
          name: file.name,
          type: file.type,
          level: node.level + 1,
          path: `${node.parent}/${file.name}`,
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
    parentPath: string = "",
    hard: boolean = false
  ): boolean => {
    if (!node.isDirectory) return false;
    if (node.id === father) {
      const nodes = nodesToInsert.map((node) => {
        node.level = level + 1;
        node.path = `${parentPath}/${node.name}`;
        return node;
      });
      if (!hard) node.content = node.content.concat(nodes);
      else node.content = nodes;
      return true;
    } else {
      for (const child of node.content) {
        if (
          insertNodeInTree(
            child,
            father,
            nodesToInsert,
            level + 1,
            `${parentPath}/${child.name}`,
            hard
          )
        )
          return true;
      }
    }
    return false;
  };

  const getFiles = async (
    record: string,
    level: number = 0,
    parent: string = ""
  ): Promise<void> => {
    try {
      const isRootFolder = level === 0;
      if (isRootFolder) setFiles(() => []);
      const response = await client.query({
        query: GET_FOLDER,
        variables: { id: record },
      });
      if (isRootFolder) {
        setFiles(
          createTree({
            ...(
              ((response.data?.getFolders?.edges as any[]) ?? []).find(
                (edge) => edge.node.name === "root"
              ) ?? { node: {} }
            ).node,
            level: 0,
            parent,
          })
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
                  subfolders: null,
                  level: -1,
                  parent: "",
                }
              ),
              updated[i].level,
              updated[i].path,
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
          await getFiles(node.id, node.level, node.path);
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
