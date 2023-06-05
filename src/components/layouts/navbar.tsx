import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { RoleContext } from "../../../utils/RoleContext";
import Image from "next/image";
import { useAuth } from "../../../firebase/AuthContext";

type User = {
  status: string
  user_name: string
  user_id: string
  user_email: string
}

const Navbar: React.FC = () => {
  const router = useRouter();
  const { role, setRole } = useContext(RoleContext);
  const {currentUser} = useAuth()
  const [user, setUser] = useState<User | null>(null)

  const managerLinks = [
    { name: "Dashboard", href: "/manager/dashboard" },
    { name: "Teams", href: "/manager/teams" },
  ];

  const userLinks = [
    { name: "Dashboard", href: "/user/dashboard" },
    { name: "TaskBuilder", href: "/user/taskbuilder" },
    { name: "Achievements", href: "/user/achievements" },
    { name: "Teams", href: "/user/teams" },
    { name: "Public Feed", href: "/user/public-feed" },
  ];

  const links = role === "manager" ? managerLinks : userLinks;

  const handleRoleChange = () => {
    if (role === "user") {
      setRole("manager");
      router.push("/manager/dashboard");
    } else if (role === "manager") {
      setRole("user");
      router.push("/user/dashboard");
    }
  };

  const getUserData = async () => {
    const res = await fetch(`http://taskeroom.akubuezeernest.com/user/${currentUser.uid}`)
    const data = await res.json()
    setUser(data)
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div className="bg-base text-white w-30 fixed top-0 bottom-0 overflow-auto">
      <div className="p-4 bg-secondary">
        <div className="flex items-center">
          <Image
            src="/icon.png"
            alt="icon"
            width={32}
            height={32}
            className="w-8 h-8 mr-2"
          />
          <div>
            <h2 className="text-lg font-bold">Your Role: {role}</h2>
            <p className="text-sm">Managed by <span className="font-bold text-green-300 cursor-pointer">{user ? user.user_name : ""}</span></p>
          </div>
        </div>
      </div>

      <nav className="mt-8">
        {links.map((link, index) => (
          <Link key={index} href={link.href}>
            <li
              className={`block py-2 px-4 ${
                router.pathname === link.href && "bg-secondary"
              }`}
            >
              {link.name}
            </li>
          </Link>
        ))}
      </nav>

      <div className="fixed bottom-0 left-0  p-4 bg-base">
        <button
          onClick={handleRoleChange}
          className="w-full py-2 text-center bg-secondary p-2 rounded"
        >
          Switch to {role === "manager" ? "User" : "Manager"} View
        </button>
      </div>
    </div>
  );
};

export default Navbar;
