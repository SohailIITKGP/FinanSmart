import React from "react";
import Image from "next/image";
import {
  LayoutGrid,
  PiggyBank,
  ShieldCheck,
  ChartPieIcon,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];
  const path = usePathname();

  return (
    <div className="p-5 bg-white h-screen">
      <div className="flex items-center gap-2 mb-6 pb-4">
        <div className="flex items-center gap-2">
          <ChartPieIcon className="w-8 h-8 text-blue-800" />
          <span className="text-blue-800 font-bold text-xl">FinanSmart</span>
        </div>
      </div>
      <div className="flex flex-col float-left">
        {menuList.map((menu, index) => (
          <Link
            href={menu.path}
            key={index}
            className={`flex gap-2 items-center p-3 text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer mb-2 ${
              path === menu.path && "bg-blue-50 text-primary"
            }`}
          >
            <menu.icon />
            <h2>{menu.name}</h2>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-5 left-5">
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </div>
  );
}

export default SideNav;
