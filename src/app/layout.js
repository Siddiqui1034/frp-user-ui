"use client"
import "./globals.css";
import { Provider } from "react-redux";
import { appStore } from "../redux2/appStore2/appStore2";
import { AppContextProvider } from "../context/appContex";
import Header from "@/components/Header/Header";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Provider store={appStore}>
          <AppContextProvider>
            <Header />
          {children}
          </AppContextProvider>
        </Provider>
        </body>
    </html>
  );
}
