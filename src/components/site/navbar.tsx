"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSalonStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  Menu, CalendarHeart, ChevronDown, Sparkles, Mail, Home, Scissors
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Bridal", href: "/bridal" },
  { label: "Gallery", href: "/gallery" },
  { label: "Pricing", href: "/pricing" },
  { label: "Team", href: "/team" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Lumière Beauty Lounge — home">
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
        <Sparkles className="h-5 w-5" />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-salon-gold ring-2 ring-background" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg font-semibold tracking-tight text-foreground">Lumière</span>
        <span className="text-[0.6rem] font-medium uppercase tracking-[0.25em] text-muted-foreground">Beauty Lounge</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { openBooking, mobileNavOpen, setMobileNavOpen } = useSalonStore();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname, setMobileNavOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md shadow-sm border-b border-border/60"
          : "bg-background/40 backdrop-blur-sm border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive(item.href) || (item.children?.some((c) => isActive(c.href)))
                    ? "text-primary"
                    : "text-foreground/75 hover:text-primary"
                )}
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
              </Link>
              {item.children && openMenu === item.label && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="w-72 overflow-hidden rounded-2xl border border-border/70 bg-card p-2 shadow-xl shadow-black/5 animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="flex w-full flex-col items-start gap-0.5 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-secondary"
                      >
                        <span className="text-sm font-semibold text-foreground">{child.label}</span>
                        {child.description && (
                          <span className="text-xs text-muted-foreground">{child.description}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary md:flex"
          >
            <Mail className="h-4 w-4 text-primary" />
            <span className="hidden xl:inline">Contact</span>
          </Link>
          <Button
            onClick={() => openBooking()}
            className="hidden rounded-full bg-primary px-5 text-sm shadow-sm transition-all hover:bg-primary/90 hover:shadow-md sm:inline-flex"
          >
            <CalendarHeart className="mr-1.5 h-4 w-4" />
            Book Now
          </Button>
        </div>
      </div>
    </header>

    {/* Mobile Bottom Navigation Bar */}
    <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-border/60 bg-background/95 pb-safe pt-2 pb-2 backdrop-blur-md lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-none">
      <Link href="/" className={cn("flex flex-col items-center gap-1", isActive("/") ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
        <Home className="h-5 w-5" />
        <span className="text-[10px] font-medium">Home</span>
      </Link>
      <Link href="/services" className={cn("flex flex-col items-center gap-1", isActive("/services") ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
        <Scissors className="h-5 w-5" />
        <span className="text-[10px] font-medium">Services</span>
      </Link>
      <button onClick={() => openBooking()} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
        <CalendarHeart className="h-5 w-5 text-primary" />
        <span className="text-[10px] font-medium text-primary">Book</span>
      </button>
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetTrigger asChild>
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
            <Menu className="h-5 w-5" />
            <span className="text-[10px] font-medium">Menu</span>
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto p-0">
          <SheetHeader className="border-b border-border/60 px-5 py-4">
            <SheetTitle asChild>
              <div><Logo /></div>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col px-3 py-3">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-border/40 last:border-0">
                <Link
                  href={item.href}
                  className={cn(
                    "flex w-full items-center justify-between py-3.5 px-3 text-left text-base font-medium rounded-lg transition-colors hover:bg-secondary",
                    isActive(item.href) && "text-primary"
                  )}
                >
                  {item.label}
                  {isActive(item.href) && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </Link>
                {item.children && (
                  <div className="pb-2 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block w-full py-2 px-3 text-left text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 flex flex-col gap-2 px-2">
              <Button onClick={() => openBooking()} className="w-full rounded-full bg-primary min-h-[44px]">
                <CalendarHeart className="mr-1.5 h-4 w-4" /> Book Appointment
              </Button>
              <Link href="/contact">
                <Button variant="outline" className="w-full rounded-full min-h-[44px]">
                  <Mail className="mr-1.5 h-4 w-4" /> Contact us
                </Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
    </>
  );
}
