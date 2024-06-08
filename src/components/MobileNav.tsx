"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  // ---------------------------------------------------------------------------
  // the current URL's pathname
  const pathName = usePathname();
  // ---------------------------------------------------------------------------
  return (
    <section className="w-full max-w-[264px]">
      {/* Sheet------------------------------------------------------------- */}
      <Sheet>
        {/* Trigger--------------------------------------------------------- */}
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="open-menu"
            className="curser-pointer sm:hidden"
          />
        </SheetTrigger>
        {/* Content--------------------------------------------------------- */}
        {/* @ts-expect-error */} {/* Disable TS error for this line */}
        <SheetContent side="left" className="border-none bg-dark-1">
          {/* Logo---------------------------------------------------------- */}
          {/* Using SheetClose around our links means that if any link is clicked, close the sheet */}
          <SheetClose asChild>
            <Link href={"/"} className="flex items-center gap-1">
              <Image
                src="/icons/logo.png"
                alt="MeetMate"
                width={32}
                height={32}
                className="max-sm:size-10"
              />
              <p className="text-[26px] font-extrabold text-white">MeetMate</p>
            </Link>
          </SheetClose>

          {/* Nav Links----------------------------------------------------- */}
          <div className="h-[calc(100vh-72px)] flex flex-col justify-between overflow-y-auto">
            <section className="flex flex-col h-full gap-6 pt-16 text-white">
              {/* Links----------------------------------------------------- */}
              {
                // For each link
                sidebarLinks.map((link) => {
                  // -----------------------------------------------------------
                  // Is this link active?
                  const isActive =
                    pathName === link.route ||
                    pathName.startsWith(`${link.route}/`);
                  // -----------------------------------------------------------
                  return (
                    // Using SheetClose around our links means that if any link is clicked, close the sheet
                    <SheetClose key={link.label} asChild>
                      <Link
                        href={link.route}
                        className={cn(
                          "flex items-center w-full max-w-60 gap-4 p-4 rounded-lg",
                          {
                            "bg-blue-1": isActive,
                          }
                        )}
                      >
                        <Image
                          src={link.imgURL}
                          alt={link.label}
                          width={20}
                          height={20}
                        />
                        <p className="font-semibold">{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })
              }
              {/* ---------------------------------------------------------- */}
            </section>
          </div>
          {/* -------------------------------------------------------------- */}
        </SheetContent>
        {/* ---------------------------------------------------------------- */}
      </Sheet>
      {/* ------------------------------------------------------------------ */}
    </section>
  );
};

export default MobileNav;
