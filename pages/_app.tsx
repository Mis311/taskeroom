import { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/tailwind.css";
import { AuthProvider } from "../firebase/AuthContext";
import Layout from "@/components/layouts/layout";

require("dotenv").config();

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout noLayout={false}>
         <Component {...pageProps} /> 
      </Layout>
    </AuthProvider>
  );
}

export default App;
