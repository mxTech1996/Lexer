"use client";

import Provider from "@/store/provider";
import { fontNunito, fontUrbanist } from "../fonts";
import "../styles/globals.css";
import { pageName } from "@/data";
import { LanguageProvider } from "@/i18n/language-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{pageName}</title>
      </head>
      <body
        className={`${fontUrbanist.variable} ${fontNunito.variable}  font-nunito`}
      >
        <LanguageProvider>
          <Provider>
            {children}
          </Provider>
        </LanguageProvider>
      </body>
    </html>
  );
}
