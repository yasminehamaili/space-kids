import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { planets } from "@/lib/planets";
import { PlanetSphere } from "@/components/Planet3D";

export const Route = createFileRoute("/planets")({
  head: () => ({
    meta: [
      { title: "Meet the Planets: Space Kids" },
      {
        name: "description",
        content: "Swipe through all 8 planets of the Solar System.",
      },
    ],
  }),
  component: PlanetsPage,
});

function PlanetsPage() {
  const navigate = useNavigate();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track which slide is centered via IntersectionObserver
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const idx = Number((entry.target as HTMLElement).dataset.index ?? 0);
            setActiveIndex(idx);
          }
        });
      },
      { root: scroller, threshold: [0.6, 0.9] },
    );
    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToIndex = (i: number) => {
    const target = slideRefs.current[i];
    if (target) target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const go = (dir: -1 | 1) => {
    const next = Math.min(Math.max(activeIndex + dir, 0), planets.length - 1);
    scrollToIndex(next);
  };

  const handlePlanetClick = (e: React.MouseEvent, id: string, isActive: boolean) => {
    if (!isActive) {
      const idx = planets.findIndex((p) => p.id === id);
      scrollToIndex(idx);
      return;
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    sessionStorage.setItem(
      "planet-origin",
      JSON.stringify({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        size: rect.width,
      }),
    );
    navigate({ to: "/planet/$id", params: { id } });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <div className="relative">
      <h1 className="mb-2 text-center font-display text-4xl font-bold text-white md:text-5xl"> Meet the Planets
      </h1>
      <p className="mb-6 text-center text-white/70">
        Tap the planet to explore!
      </p>

      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous planet"
          disabled={activeIndex === 0}
          className="absolute left-2 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:scale-110 hover:bg-white/20 disabled:opacity-30 md:left-6 md:h-16 md:w-16"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Right arrow */}
        <button
          onClick={() => go(1)}
          aria-label="Next planet"
          disabled={activeIndex === planets.length - 1}
          className="absolute right-2 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:scale-110 hover:bg-white/20 disabled:opacity-30 md:right-6 md:h-16 md:w-16"
        >
          <ChevronRight size={32} />
        </button>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {planets.map((p, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={p.id}
                data-index={i}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                className="flex min-w-full shrink-0 snap-center items-center justify-center px-6 py-6"
                style={{ minHeight: "70vh" }}
              >
                <div
                  className="flex flex-col items-center text-center transition-all duration-500"
                  style={{
                    opacity: isActive ? 1 : 0.25,
                    transform: `scale(${isActive ? 1 : 0.75})`,
                    filter: isActive ? "none" : "blur(2px)",
                  }}
                >
                  <div className="text-sm uppercase tracking-[0.3em] text-white/60">
                    Planet #{p.order}
                  </div>
                  <h2 className="mb-6 mt-2 font-display text-5xl  text-white drop-shadow-lg md:text-7xl">
                    {p.name}
                  </h2>
                  <div
                    onClick={(e) => handlePlanetClick(e, p.id, isActive)}
                    className="cursor-pointer transition-transform hover:scale-105"
                    style={{
                      animation: isActive ? "float-bob 4s ease-in-out infinite" : "none",
                    }}
                  >
                    <PlanetSphere
                      planet={p}
                      size={Math.min(
                        320,
                        typeof window !== "undefined" ? window.innerWidth * 0.6 : 320,
                      )}
                      withRing={p.id === "saturn"}
                    />
                  </div>
                  <p className="mx-auto mt-8 w-full max-w-[85vw] text-lg text-white/80 sm:max-w-xl md:text-xl">
                    {p.summary}
                  </p>
                  {isActive && (
                    <button
                      onClick={(e) => handlePlanetClick(e, p.id, true)}
                      className="mt-6 rounded-full border border-white/30 bg-white/10 px-8 py-3 font-display text-lg  text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-white/20"
                    >
                      Explore {p.name} →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {planets.map((p, i) => (
            <button
              key={p.id}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to ${p.name}`}
              className="h-2.5 rounded-full transition-all"
              style={{
                width: i === activeIndex ? 28 : 10,
                background: i === activeIndex ? p.accent : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
