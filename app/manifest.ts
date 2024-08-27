import { _siteDetails } from "@/lib/config";
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: _siteDetails.name,
    description: _siteDetails.desc,
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
  };
}
