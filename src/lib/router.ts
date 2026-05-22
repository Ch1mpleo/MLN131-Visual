// Lightweight pathname-based router. Uses history.pushState so that ordinary
// in-page anchor links (e.g. "#hero") continue to work as scroll targets.
//
// On GitHub Pages the site is served from a sub-path (e.g. "/VNR202/").
// `import.meta.env.BASE_URL` gives that sub-path in both dev ("/") and prod.
import { useEffect, useState } from "react";

function trimBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (base && pathname.startsWith(base)) {
    const stripped = pathname.slice(base.length);
    return stripped.length === 0 ? "/" : stripped;
  }
  return pathname || "/";
}

export function getCurrentPath(): string {
  if (typeof window === "undefined") return "/";
  return trimBase(window.location.pathname) || "/";
}

const NAVIGATE_EVENT = "app:navigate";

export function navigate(to: string): void {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const target = to.startsWith("/") ? to : `/${to}`;
  const full = `${base}${target}`;
  if (window.location.pathname !== full) {
    window.history.pushState({}, "", full);
    window.dispatchEvent(new Event(NAVIGATE_EVENT));
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }
}

export function useRoute(): string {
  const [path, setPath] = useState<string>(getCurrentPath());
  useEffect(() => {
    const onChange = () => setPath(getCurrentPath());
    window.addEventListener("popstate", onChange);
    window.addEventListener(NAVIGATE_EVENT, onChange);
    return () => {
      window.removeEventListener("popstate", onChange);
      window.removeEventListener(NAVIGATE_EVENT, onChange);
    };
  }, []);
  return path;
}
