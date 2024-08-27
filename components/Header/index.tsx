"use client";

import { useState } from "react";
import { AlignLeftIcon } from "lucide-react";

import MenuLink from "./MenuLink";
import Logo from "../Reusables/Logo";
import { _siteDetails } from "@/lib/config";
import { Navbar } from "./NavBar";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="h-16 pSm py-3 border-b border-primary bg-light w-full flexBetween z-10">
        <Logo />

        <AlignLeftIcon
          onClick={toggleOpen}
          className="text-primary md:hidden"
          size={28}
        />

        <div className="w-[16rem] hidden md:flexBetween">
          {_siteDetails.menuLinks.map((item) => (
            <MenuLink key={item.link} {...item} />
          ))}
        </div>

        {isOpen && <Navbar />}
      </header>
    </>
  );
}
