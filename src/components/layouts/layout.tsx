import React from "react";
import Link from "next/link";

type LayoutProps = {
  children: React.ReactNode;
  noLayout?: boolean; 
};

const Layout: React.FC<LayoutProps> = ({ children, noLayout = false }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {!noLayout && (
        <>
          <header className="bg-purple-400 text-white p-4 text-center">
            <Link href="/">
              <h1 className="text-3xl font-bold cursor-pointer">Taskeroom</h1>
            </Link>
          </header>
        </>
      )}
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
};

export default Layout;
