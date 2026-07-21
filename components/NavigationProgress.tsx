"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const START_PROGRESS = 12;
const MAX_PROGRESS = 92;

export default function NavigationProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    function startNavigation(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as HTMLElement).closest("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (destination.href === window.location.href || destination.hash && destination.pathname === window.location.pathname && destination.search === window.location.search) return;

      setProgress(START_PROGRESS);
      setActive(true);
    }

    document.addEventListener("click", startNavigation);
    return () => document.removeEventListener("click", startNavigation);
  }, []);

  useEffect(() => {
    if (!active) return;

    const timer = window.setInterval(() => {
      setProgress((current) => Math.min(MAX_PROGRESS, current + Math.max(1, (MAX_PROGRESS - current) * 0.08)));
    }, 180);
    const safetyTimer = window.setTimeout(() => {
      setActive(false);
      setProgress(0);
    }, 12000);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(safetyTimer);
    };
  }, [active]);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    setProgress(100);

    const timer = window.setTimeout(() => {
      setActive(false);
      setProgress(0);
    }, 220);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className={`navigation-progress ${active ? "navigation-progress--active" : ""}`}
      style={{ transform: `scaleX(${progress / 100})` }}
    />
  );
}
