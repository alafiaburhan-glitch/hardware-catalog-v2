import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "Noor Agencies | Industrial Hardware Supplier in Coimbatore",
  description:
    "Noor Agencies supplies emery paper, emery rolls, Loctite adhesives, tarpaulins, shade nets, ropes, hoses, safety products and industrial hardware in Coimbatore.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
