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
import { useLoader } from "../Loader";

interface Props {
  children: ReactNode;
}

const ApolloProvider = (props: Props) => {
  const { children } = props;
  const { actions } = useLoader();

  const loaderLink = new ApolloLink((operation, forward) => {
    actions?.addPendingActions();

    return forward(operation).map((data) => {
      actions?.removePendingActions();
      return data;
    });
  });

  const authLink = new ApolloLink((operation, forward) => {
    const token = getItem("token");
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return forward(operation);
  });

  const httpLink = createUploadLink({
    uri: import.meta.env.VITE_TANTOR_CORE_GRAPHQL,
  });

  const client = new ApolloClient({
    link: from([loaderLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  });

  return <AProvider client={client}>{children}</AProvider>;
};

export default ApolloProvider;
