import { AppProps } from "next/app";
import React from "react";

import "./globals.css";
import Wrapper from "@/components/wrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Wrapper />
      <Component {...pageProps} />
    </>
  );
}
