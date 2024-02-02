import { gql } from "@apollo/client";

export const GET_CASES = gql`
  query GetCases {
    getCases {
      edges {
        node {
          mongoId
          name
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
    }
  }
`;
