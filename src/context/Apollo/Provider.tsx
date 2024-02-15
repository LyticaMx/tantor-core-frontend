import {
  ApolloClient,
  ApolloLink,
  ApolloProvider as AProvider,
  InMemoryCache,
  from,
} from "@apollo/client";
import { ReactNode } from "react";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { getItem } from "@/utils/persistentStorage";
import { LoaderContextRef } from "../Loader/LoaderContext";
import { AuthContextRef } from "../Auth/context";

interface Props {
  children: ReactNode;
}

const authLink = new ApolloLink((operation, forward) => {
  const token = getItem("token");
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation).map((response) => {
    if (response.errors) {
      response.errors.forEach((error) => {
        if (error.message === "Credenciales inválidas.") {
          AuthContextRef.current?.actions?.killSession();
        }
      });
    }
    return response;
  });
});

const loaderLink = new ApolloLink((operation, forward) => {
  LoaderContextRef.current?.actions?.addPendingActions();

  return forward(operation).map((operation) => {
    LoaderContextRef.current?.actions?.removePendingActions();
    return operation;
  });
});

const httpLink = createUploadLink({
  uri: import.meta.env.VITE_TANTOR_CORE_GRAPHQL,
});

const client = new ApolloClient({
  link: from([loaderLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

const ApolloProvider = (props: Props) => (
  <AProvider client={client}>{props.children}</AProvider>
);

export default ApolloProvider;
