import { gql } from "@apollo/client";

export const GET_FOLDER = gql`
  query GetFolders($caseId: String, $id: String) {
    getFolders(
      includes: { subfolders: true, files: true }
      filters: { caseId: $caseId, id: $id }
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
      newFile: {
        file: $file
        folderId: $folderId
        caseId: $caseId
        fileType: "DOCUMENT"
      }
    ) {
      mongoId
      name
      folderId
    }
  }
`;

export const CREATE_FOLDER = gql`
  mutation CreateFolder($name: String!, $folderId: String, $caseId: String) {
    createFolder(
      newFolder: { name: $name, folderId: $folderId, caseId: $caseId }
    ) {
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
