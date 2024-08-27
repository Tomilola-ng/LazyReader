"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { _siteDetails } from "@/lib/config";

export const Navbar = () => {
  return (
    <motion.div className="md:hidden bg-white border-b w-full absolute top-16 left-0 transition-all">
      {_siteDetails.menuLinks.map((item) => (
        <Link
          href={item.link}
          key={item.link}
          className="py-3 pl-4 border-b hover:textBg transition-all block"
        >
          {item.label}
        </Link>
      ))}
    </motion.div>
  );
};
