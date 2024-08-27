import { _siteDetails } from "@/lib/config";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let siteList = [
    {
      url: _siteDetails.domain,
      changefreq: "daily",
      priority: 1.0,
    },
  ];

  // Add more routes here

  return siteList;
}
