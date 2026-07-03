import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "Noor Agencies",
  description:
    "Industrial hardware supplier offering ropes, tarpaulins, lifting slings, safety products and more.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}