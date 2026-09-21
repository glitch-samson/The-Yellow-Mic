"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

import { Logo } from "../ui/Logo";
import { navItems, navCta } from "@/lib/content";

export function Navbar() {
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();
  const isOpen = openPathname === pathname;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPathname(null);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActiveRoute = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/about") return pathname === "/about";
    if (href === "/episodes") return pathname === "/episodes" || pathname.startsWith("/episodes");
    if (href === "/blog") return pathname === "/blog" || pathname.startsWith("/blog/");
    if (href === "/hosts") return pathname === "/hosts";
    return false;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        hasScrolled || isOpen
          ? "bg-[#191410]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3 sm:py-4"
          : "bg-[#191410]/40 backdrop-blur-md border-b border-white/[0.06] py-4 sm:py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 sm:px-8 lg:px-[100px]">
        {/* Brand Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 md:gap-2 lg:gap-3 md:flex" aria-label="Main Navigation">
          {navItems.map((item) => {
            const active = isActiveRoute(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative px-3.5 py-2 text-[15px] font-medium transition-all duration-200 rounded-full ${
                  active
                    ? "text-white font-semibold bg-white/10 shadow-inner"
                    : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {item.label}
                {active && (
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#EAB819]"
                    aria-hidden
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href={navCta.href}
            className="group relative inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#EAB819] px-5 text-sm font-semibold text-white shadow-[0_2px_15px_rgba(234,184,25,0.35)] transition-all duration-300 hover:bg-[#F5C738] hover:shadow-[0_4px_25px_rgba(234,184,25,0.55)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{navCta.label}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href={navCta.href}
            className="inline-flex h-8 items-center justify-center rounded-full bg-[#EAB819] px-3.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#F5C738]"
          >
            {navCta.label}
          </Link>

          <button
            type="button"
            onClick={() => setOpenPathname(isOpen ? null : pathname)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#EAB819]"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[420px] opacity-100 border-t border-white/10 mt-3" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-[#191410]/95 backdrop-blur-2xl px-6 py-6 space-y-2">
          {navItems.map((item) => {
            const active = isActiveRoute(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpenPathname(null)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition ${
                  active
                    ? "bg-[#EAB819]/15 text-[#EAB819] font-semibold"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                {active && <span className="h-2 w-2 rounded-full bg-[#EAB819]" />}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-white/10">
            <Link
              href={navCta.href}
              onClick={() => setOpenPathname(null)}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#EAB819] text-center font-semibold text-white shadow-lg transition hover:bg-[#F5C738]"
            >
              <span>{navCta.label}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
