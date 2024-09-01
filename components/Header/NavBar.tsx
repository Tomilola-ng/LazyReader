"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { _siteDetails } from "@/lib/config";
import { LINKEDIN_ICON } from "../Reusables/Icons";

export const Navbar = () => {
  return (
    <motion.div className="md:hidden bg-white dark:bg-neutral-900 border-b w-full absolute top-16 left-0 transition-all">
      {_siteDetails.menuLinks.map((item) => (
        <Link
          href={item.link}
          key={item.link}
          className="py-3 pl-4 border-b hover:textBg dark:text-neutral-200 transition-all block"
        >
          {item.label}
        </Link>
      ))}
      <Link
        href={"/"}
        className="py-3 pl-4 border-b hover:textBg transition-all flex items-center gap-x-2"
      >
        LinkedIn <LINKEDIN_ICON />
      </Link>
    </motion.div>
  );
};
