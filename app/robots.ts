import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: [
      "https://www.nooragencies.in/sitemap.xml",
      "https://www.nooragencies.in/sitemaps/agri-tools.xml",
    ],
    host: "https://www.nooragencies.in",
  };
}
