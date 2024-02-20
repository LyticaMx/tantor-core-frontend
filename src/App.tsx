import { BrowserRouter } from "react-router-dom";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { LanguageProvider } from "@/context/Language";
import { LoaderProvider } from "@/context/Loader";
import { AuthProvider } from "@/context/Auth";
import Navigator from "@/router/Navigator";
import Loader from "@/components/Loader";
import { ToastContainer } from "react-toastify";
import { RecordsProvider } from "@/context/Records";
import { FileTreeProvider } from "@/context/FileTree/Provider";
import ApolloProvider from "@/context/Apollo/Provider";

import "./App.css";

if (!import.meta.env.PROD) {
  loadDevMessages();
  loadErrorMessages();
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ApolloProvider>
          <LoaderProvider>
            <AuthProvider>
              <RecordsProvider>
                <FileTreeProvider>
                  <Navigator />
                  <Loader />
                </FileTreeProvider>
              </RecordsProvider>
            </AuthProvider>
          </LoaderProvider>
        </ApolloProvider>
      </LanguageProvider>
      <ToastContainer position="top-right" limit={5} />
    </BrowserRouter>
  );
}

export default App;
