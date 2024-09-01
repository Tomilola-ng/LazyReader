"use client";

import { useState } from "react";
import { AlignLeftIcon } from "lucide-react";

import MenuLink from "./MenuLink";
import Logo from "../Reusables/Logo";
import { _siteDetails } from "@/lib/config";
import { Navbar } from "./NavBar";
import Link from "next/link";
import { LINKEDIN_ICON } from "../Reusables/Icons";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="h-16 pSm py-3 border-b border-primary bg-light w-full flexBetween z-10">
        <Logo />

        <div className="md:hidden flexBetween w-fit gap-x-2">
          <AlignLeftIcon onClick={toggleOpen} />
          <ThemeSwitch />
        </div>

        <div className="w-[20rem] hidden md:flexBetween">
          {_siteDetails.menuLinks.map((item) => (
            <MenuLink key={item.link} {...item} />
          ))}
        </div>

        <div className="w-fit gap-x-4 hidden md:flexBetween">
          <Link
            href="https://linkedin.com/in/tomilola-oluwafemi"
            target="/blank"
            className="text-neutral-800 dark:text-neutral-200"
          >
            <LINKEDIN_ICON />
          </Link>
          <ThemeSwitch />
        </div>

        {isOpen && <Navbar />}
      </header>
    </>
  );
}
