import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.tsx";
import ThemeProvider from "./context/ThemeProvider.tsx";
import UIProvider from "./context/UIProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <UIProvider>
            <App />
          </UIProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </Provider>,
);
