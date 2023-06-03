
import React from "react";
import Link from "next/link";
import Navbar from "./navbar";

type LayoutProps = {
  children: React.ReactNode;
  noLayout?: boolean; 
};

const Layout: React.FC<LayoutProps> = ({ children, noLayout = false }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar noLayout={noLayout} />
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
};

export default Layout;
