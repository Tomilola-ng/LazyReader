import { _siteDetails } from "@/lib/config";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "admin/",
    },
    sitemap: _siteDetails.domain + "/sitemap.xml",
  };
}
