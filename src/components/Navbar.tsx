import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search } from "lucide-react";
import { planets } from "@/lib/planets";

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const tween = gsap.to(el, {
      paddingTop: 6,
      paddingBottom: 6,
      backdropFilter: "blur(24px)",
      backgroundColor: "rgba(10, 8, 30, 0.7)",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: 0,
        end: 200,
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const matches =
    q.trim().length > 0
      ? planets.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
      : [];

return (
  <div
    ref={navRef}
    className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between gap-1 px-2 py-3 sm:gap-3 sm:px-4 sm:py-4 md:px-8"
  >
    {/* Logo - Left */}
    <Link to="/" className="min-w-0 flex-shrink-0">
      <img
        src="/logo.png"
        alt="Logo"
        className="h-10 w-auto object-contain transition hover:scale-105 sm:h-14 md:h-20"
      />
    </Link>

    {/* Search - Center */}
    <div className="relative min-w-0 flex-shrink">
      <div
        className="flex min-w-0 items-center gap-1 rounded-full border px-2 py-1.5 sm:gap-2 sm:px-4 sm:py-2"
        style={{
          background: "rgba(255,255,255,0.08)",
          borderColor: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Search size={16} className="flex-shrink-0 text-white/80" />

        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Search…"
          className="w-14 min-w-0 bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none sm:w-32 md:w-56"
        />
      </div>

      {open && matches.length > 0 && (
        <div
          className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl border"
          style={{
            background: "rgba(20,15,40,0.85)",
            borderColor: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(16px)",
          }}
        >
          {matches.map((p) => (
            <Link
              key={p.id}
              to="/planet/$id"
              params={{ id: p.id }}
              className="block px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              {p.name}
            </Link>
          ))}
        </div>
      )}
    </div>

    {/* Nav pill - Right */}
    <div
      className="flex flex-shrink-0 items-center gap-0.5 rounded-full border p-1 sm:gap-1"
      style={{
        background: "rgba(255,255,255,0.08)",
        borderColor: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Link
        to="/"
        className="whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/15 sm:px-4 sm:text-sm"
        activeProps={{
          style: { background: "rgba(255,255,255,0.2)" },
        }}
        activeOptions={{ exact: true }}
      >
        Home
      </Link>

      <a
        href="#contact"
        className="whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/15 sm:px-4 sm:text-sm"
      >
        <span className="sm:hidden">Contact</span>
        <span className="hidden sm:inline">Contact Us</span>
      </a>
    </div>
  </div>
);
}
