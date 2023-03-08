import type { AppProps } from "next/app";
import { UserContextProvider } from "@/modules/users";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}
