import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { LanguageProvider } from "@/context/Language";
import { LoaderProvider } from "@/context/Loader";
import { AuthProvider } from "@/context/Auth";
import Navigator from "@/router/Navigator";
import Loader from "@/components/Loader";
import { ToastContainer } from "react-toastify";
import { RecordsProvider } from "@/context/Records";

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <LoaderProvider>
          <AuthProvider>
            <RecordsProvider>
              <Navigator />
              <Loader />
            </RecordsProvider>
          </AuthProvider>
        </LoaderProvider>
      </LanguageProvider>
      <ToastContainer position="top-right" limit={5} />
    </BrowserRouter>
  );
}

export default App;
