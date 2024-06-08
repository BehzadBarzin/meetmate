"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  // ---------------------------------------------------------------------------
  // the current URL's pathname
  const pathName = usePathname();
  // ---------------------------------------------------------------------------
  return (
    <section className="sticky left-0 flex flex-col justify-between bg-dark-1 h-screen w-fit p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-col flex-1 gap-6">
        {/* Sidebar Links--------------------------------------------------- */}
        {
          // For each link
          sidebarLinks.map((link) => {
            // -----------------------------------------------------------------
            // Is this link active?
            const isActive =
              pathName === link.route || pathName.startsWith(link.route);
            // -----------------------------------------------------------------
            return (
              <Link
                href={link.route}
                key={link.label}
                className={cn(
                  "flex items-center justify-start gap-4 p-4 rounded-lg",
                  {
                    "bg-blue-1": isActive,
                  }
                )}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                <p className="text-lg font-semibold max-lg:hidden">
                  {link.label}
                </p>
              </Link>
            );
          })
        }
        {/* ---------------------------------------------------------------- */}
      </div>
    </section>
  );
};

export default Sidebar;
