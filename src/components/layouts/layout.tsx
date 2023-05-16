import React from 'react';
import styles from './Layout.module.css';

// Define the type for your props
type LayoutProps = {
  children: React.ReactNode;
};

// Use the type in your component definition
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.logo}>Taskeroom</h1>
            </header>
            <main className={styles.main}>
                {children}
            </main>
            <footer className={styles.footer}>
                <p>&copy; 2023 Taskeroom</p>
            </footer>
        </div>
    )
}

export default Layout;
