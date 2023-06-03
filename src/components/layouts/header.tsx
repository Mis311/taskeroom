import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <div className="flex flex-col fixed w-full z-10">
      <header className="bg-indigo-400 text-white px-4 py-4 text-center">
        <Link href="/">
          <h1 className="text-3xl font-bold cursor-pointer">Taskeroom</h1>
        </Link>
      </header>
    </div>
  );
};

export default Header;
