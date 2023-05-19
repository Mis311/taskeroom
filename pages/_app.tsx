import React from 'react';
import Layout from '@/components/layouts/layout';
import Home from '.';
import '../styles/globals.css'
import { AuthProvider } from '../firebase/AuthContext';

const App: React.FC = () => {
    return (
        <AuthProvider>
        <Layout>
            <Home />
        </Layout>
        </AuthProvider>
    )
}

export default App;
