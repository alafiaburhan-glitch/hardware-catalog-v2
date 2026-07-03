import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Noor Agencies",
    short_name: "Noor Agencies",
    description:
      "Industrial Hardware Solutions - Ropes, Tarpaulins, Lifting Equipment, Hoses, Safety Products and more.",

    start_url: "/",
    display: "standalone",

    background_color: "#ffffff",
    theme_color: "#b91c1c",

    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
     
    ],
  };
}