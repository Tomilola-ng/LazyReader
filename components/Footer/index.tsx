import Link from "next/link";
import Logo from "../Reusables/Logo";
import { _siteDetails } from "@/lib/config";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="flexBetween flex-col md:flex-row flex-wrap py-10 pSm gap-y-4 bg-gray-900"
    >
      <Logo />

      <div className="flex flex-col">
        <Link href="" className="text-gray-400 text-sm hover:text-white">
          Some Links Here
        </Link>
        <Link href="" className="text-gray-400 text-sm hover:text-white">
          Some Links Here
        </Link>
        <Link href="" className="text-gray-400 text-sm hover:text-white">
          Some Links Here
        </Link>
      </div>

      <div className="flex flex-col">
        {_siteDetails.menuLinks.map((link, index) => (
          <Link
            key={index}
            href={link.link}
            className="text-gray-400 text-sm hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-col">
        {_siteDetails.menuLinks.map((link, index) => (
          <Link
            key={index}
            href={link.link}
            className="text-gray-400 text-sm hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <hr className="w-full my-4" />
      <p>© {new Date().getFullYear()} All rights reserved. - </p>
    </footer>
  );
}
