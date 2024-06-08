import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      {/* Logo-------------------------------------------------------------- */}
      <Link href={"/"} className="flex items-center gap-1">
        <Image
          src="/icons/logo.png"
          alt="MeetMate"
          width={32}
          height={32}
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          MeetMate
        </p>
      </Link>
      {/* ------------------------------------------------------------------ */}
      <div className="flex-between gap-5">
        {/* Clerk User Management------------------------------------------- */}
        {/* .... */}
        {/* Mobile Nav------------------------------------------------------ */}
        <MobileNav />
        {/* ---------------------------------------------------------------- */}
      </div>
      {/* ------------------------------------------------------------------ */}
    </nav>
  );
};

export default Navbar;
