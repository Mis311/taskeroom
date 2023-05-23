import React from 'react';
import styles from './Layout.module.css';

// Define the type for props
type LayoutProps = {
  children: React.ReactNode;
  noLayout?: boolean; // '?' indicates optional prop
};

// Use the type in your component definition
const Layout: React.FC<LayoutProps> = ({ children, noLayout = false }) => {
    return (
        <div className={styles.container}>
           {!noLayout && (
             <>
               <header className={styles.header}>
                 <h1 className={styles.logo}>Taskeroom</h1>
               </header>
               <footer className={styles.footer}>
                 <p>&copy; 2023 Taskeroom</p>
               </footer>
             </>
           )}
           <main className={styles.main}>
             {children}
           </main>
        </div>
    );
};

export default Layout;
