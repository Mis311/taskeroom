import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-base text-white w-30 fixed top-16 bottom-0 overflow-auto">
      <div className="p-4 bg-secondary">
        <div className="flex items-center">
          <img src="your-logo-path" alt="logo" className="w-8 h-8 mr-2" />
          <div>
            <h2 className="text-lg font-bold">Your Regional Manager</h2>
            <p className="text-sm">Manager's Name</p>
          </div>
        </div>
      </div>
      <nav className="mt-8">
        <Link href="/dashboard">
          <li
            className={`block py-2 px-4 ${
              router.pathname === "/dashboard" && "bg-secondary"
            }`}
          >
            Dashboard
          </li>
        </Link>
        <Link href="/taskMaker">
          <li
            className={`block py-2 px-4 ${
              router.pathname === "/taskMaker" && "bg-secondary"
            }`}
          >
            TodoMaker
          </li>
        </Link>
        <Link href="/achievements">
          <li
            className={`block py-2 px-4 ${
              router.pathname === "/achievements" && "bg-secondary"
            }`}
          >
            Achievements
          </li>
        </Link>
        <Link href="/teams">
          <li
            className={`block py-2 px-4 ${
              router.pathname === "/teams" && "bg-secondary"
            }`}
          >
            Teams
          </li>
        </Link>
        <Link href="/public-feed">
          <li
            className={`block py-2 px-4 ${
              router.pathname === "/public-feed" && "bg-secondary"
            }`}
          >
            Public Feed
          </li>
        </Link>
      </nav>
      <div className="fixed bottom-0 left-0  p-4 bg-base">
        <Link href="/managerDashboard">
          <button className="w-full py-2 text-center bg-secondary">
            Switch to Manager View
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
