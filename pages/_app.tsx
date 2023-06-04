import { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/tailwind.css";
import { AuthProvider } from "../firebase/AuthContext";
import Layout from "@/components/layouts/layout";
import Header from "@/components/layouts/header";
require("dotenv").config();
import { RoleProvider } from "./RoleContext"

function App({ Component, pageProps, router }: AppProps) {
  // Removing navbar from home
  const isHomePage = router.pathname === "/";

  return (
    <AuthProvider>
      {isHomePage ? (
        <>
          <Header></Header>
          <Component {...pageProps} />
        </>
      ) : (
        <Layout>
           <RoleProvider>
          <Component {...pageProps} />
          </RoleProvider>
        </Layout>
      )}
    </AuthProvider>
  );
}

export default App;
