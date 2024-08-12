"use client"
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css"
import { Provider, useSelector } from "react-redux";
import { appStore } from "../redux2/appStore2/appStore2";
import { AppContextProvider } from "../context/appContex";
import {LayoutWrapper} from './layoutWrapper'


export default function RootLayout({ children }) {
  // But it should be inside Provider so for that i will create layoutWrapper.js
  return (
    <html lang="en">
      <body >
        <Provider store={appStore}>
          <AppContextProvider>

          <LayoutWrapper>
            {children}
          </LayoutWrapper> 

          </AppContextProvider>
         
        </Provider>
        </body>
    </html>
  );
}
