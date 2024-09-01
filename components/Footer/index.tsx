import Link from "next/link";
import Logo from "../Reusables/Logo";
import { _siteDetails } from "@/lib/config";
import { WHATSAPP_ICON, TWITTER_ICON, LINKEDIN_ICON } from "../Reusables/Icons";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="flexBetween flex-col md:flex-row flex-wrap py-10 pSm gap-y-4 text-sm"
    >
      <Logo />

      <div className="flexBetween flex-col md:flex-row md:w-1/3">
        {_siteDetails.menuLinks.map((link, index) => (
          <Link key={index} href={link.link}>
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flexBetween flex-col md:flex-row md:w-[10%]">
        <WHATSAPP_ICON />
        <TWITTER_ICON />
        <LINKEDIN_ICON />
      </div>

      <hr className="w-full my-4" />
      <p className="text-center w-full">
        © {new Date().getFullYear()} All rights reserved. - {_siteDetails.name}
      </p>
    </footer>
  );
}
