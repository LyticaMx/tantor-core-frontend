import { gql } from "@apollo/client";

export const GET_FOLDER = gql`
  query GetFolders($id: String) {
    getFolders(
      includes: { subfolders: true, files: true }
      filters: { id: $id }
    ) {
      edges {
        node {
          name
          mongoId
          subfolders {
            mongoId
            name
          }
          files {
            mongoId
            name
          }
        }
      }
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!, $folderId: String, $caseId: String) {
    uploadFile(
      newFiles: [{ file: $file, folderId: $folderId, caseId: $caseId }]
    ) {
      mongoId
      name
      folderId
    }
  }
`;

export const CREATE_FOLDER = gql`
  mutation CreateFolder($name: String!, $folderId: String) {
    createFolder(newFolder: { name: $name, folderId: $folderId }) {
      mongoId
      name
    }
  }
`;

export const FRAGMENT_NEW_FOLDER = gql`
  fragment NewFolder on Folder {
    id
    name
  }
`;
