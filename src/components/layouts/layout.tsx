import React from "react";
import Link from "next/link";
import Navbar from "./navbar";

type LayoutProps = {
  children: React.ReactNode;
  navbar?: boolean; 
  header?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ children, navbar = true, header = false }) => {
  return (
    <div className="flex flex-col min-h-screen ">
      {header && (
        <header className="bg-indigo-400 text-white p-4 text-center">
          <Link href="/">
            <h1 className="text-3xl font-bold cursor-pointer">Taskeroom</h1>
          </Link>
        </header>
      )}
      {navbar && <Navbar />}
      <main className="flex-grow p-6 ml-64">{children}</main>
    </div>
  );
};

export default Layout;
