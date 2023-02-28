import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { wrapper } from "../store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import "@/styles/tailwind.css";
import "focus-visible";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => storePathValues, [router.asPath]);

  function storePathValues() {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    // Set the previous path as the value of the current path.
    const prevPath = storage.getItem("currentPath");
    storage.setItem("prevPath", prevPath);
    // Set the current path value by looking at the browser's location object.
    storage.setItem("currentPath", globalThis.location.pathname);
  }

  return (
    <>
      <SessionProvider>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />
        </Head>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <ToastContainer />
      </SessionProvider>
    </>
  );
}

export default wrapper.withRedux(App);
