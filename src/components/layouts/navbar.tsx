import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="h-full bg-base text-white">
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
          <li className={`block py-2 px-4 ${router.pathname === "/dashboard" && "bg-secondary"}`}>Dashboard</li>
        </Link>
        <Link href="/achievements">
          <li className={`block py-2 px-4 ${router.pathname === "/achievements" && "bg-secondary"}`}>Achievements</li>
        </Link>
        <Link href="/teams">
          <li className={`block py-2 px-4 ${router.pathname === "/teams" && "bg-secondary"}`}>Teams</li>
        </Link>
        <Link href="/public-feed">
          <li className={`block py-2 px-4 ${router.pathname === "/public-feed" && "bg-secondary"}`}>Public Feed</li>
        </Link>
      </nav>
      <div className="absolute bottom-0 left-0 w-full p-4">
        <button className="w-full py-2 text-center bg-secondary">Switch to Manager View</button>
      </div>
    </div>
  );
};

export default Navbar;
