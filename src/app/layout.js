"use client"
import "./globals.css";
import { Provider } from "react-redux";
import { appStore } from "../redux2/appStore2/appStore2";
import { AppContextProvider } from "../context/appContex";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Provider store={appStore}>
          <AppContextProvider>
          {children}
          </AppContextProvider>
        </Provider>
        </body>
    </html>
  );
}
