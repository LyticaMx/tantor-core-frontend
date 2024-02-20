import { gql } from "@apollo/client";

export const GET_CASES = gql`
  query GetCases($name: String) {
    getCases(
      filters: { name: { contains: $name } }
      includes: { folders: true }
    ) {
      edges {
        node {
          folders {
            mongoId
            name
          }
          mongoId
          name
          status
        }
      }
    }
  }
`;

export const ADD_CASE = gql`
  mutation CreateCase($name: String!) {
    createCase(newCase: { name: $name }) {
      name
      mongoId
      folders {
        mongoId
        name
      }
      status
    }
  }
`;
