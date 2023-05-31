// pages/_app.tsx
import { AppProps } from 'next/app'
import '../styles/globals.css'
import { AuthProvider } from '../firebase/AuthContext';
import Layout from '@/components/layouts/layout';

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default App;
