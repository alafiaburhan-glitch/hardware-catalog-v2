import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "Noor Agencies",
  description:
    "Noor Agencies supplies industrial hardware including ropes, tarpaulins, lifting equipment, ladders, hoses, safety products, industrial adhesives and more across India.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}