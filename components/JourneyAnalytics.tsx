"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const SCROLL_THRESHOLDS = [25, 50, 75, 90];

function pageType(pathname: string) {
  if (pathname === "/") return "home";
  if (pathname === "/search") return "search";
  if (pathname === "/categories") return "category_index";
  if (pathname.startsWith("/categories/")) return "category";
  if (pathname.startsWith("/products/")) return "product";
  if (pathname === "/contact") return "contact";
  return "content";
}

export default function JourneyAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    const enteredAt = Date.now();
    const reached = new Set<number>();
    trackEvent("page_view", {
      page_location: `${window.location.origin}${pathname}${search ? `?${search}` : ""}`,
      page_path: pathname,
      page_title: document.title,
      page_type: pageType(pathname),
    });

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = Math.round((window.scrollY / scrollable) * 100);
      for (const threshold of SCROLL_THRESHOLDS) {
        if (percent >= threshold && !reached.has(threshold)) {
          reached.add(threshold);
          trackEvent("scroll_depth", { page_path: pathname, percent_scrolled: threshold });
        }
      }
    };

    const reportEngagement = () => {
      const seconds = Math.round((Date.now() - enteredAt) / 1000);
      if (seconds >= 10) {
        trackEvent("page_engagement", {
          page_path: pathname,
          engagement_seconds: seconds,
          max_scroll_percent: reached.size ? Math.max(...reached) : 0,
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", reportEngagement, { once: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", reportEngagement);
      reportEngagement();
    };
  }, [pathname, search]);

  return null;
}
