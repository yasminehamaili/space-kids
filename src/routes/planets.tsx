import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { planets } from "@/lib/planets";
import { PlanetSphere } from "@/components/Planet3D";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/planets")({
  head: () => ({
    meta: [
      { title: "Meet the Planets — Space Kids" },
      { name: "description", content: "Scroll through all 8 planets of the Solar System." },
    ],
  }),
  component: PlanetsPage,
});

function PlanetsPage() {
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          y: 60,
          scale: 0.9,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const scrollNext = () => {
    const list = listRef.current;
    if (!list) return;
    list.scrollBy({ top: window.innerHeight * 0.7, behavior: "smooth" });
  };

  const handleClick = (e: React.MouseEvent, id: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    sessionStorage.setItem(
      "planet-origin",
      JSON.stringify({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        size: 200,
      }),
    );
    navigate({ to: "/planet/$id", params: { id } });
  };

  return (
    <div className="relative mx-auto max-w-5xl px-4">
      <h1 className="mb-6 text-center font-display text-4xl font-bold text-white md:text-5xl">
        🪐 Meet the Planets
      </h1>
      <p className="mb-8 text-center text-white/70">Tap a planet to learn more!</p>

      <div ref={listRef} className="flex flex-col gap-6 pb-24">
        {planets.map((p, i) => (
          <div
            key={p.id}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            onClick={(e) => handleClick(e, p.id)}
            className="glass-panel flex cursor-pointer items-center gap-6 p-6 transition hover:scale-[1.02] hover:border-white/30"
          >
            <div className="shrink-0">
              <PlanetSphere planet={p} size={100} withRing={p.id === "saturn"} />
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-widest text-white/50">
                Planet #{p.order}
              </div>
              <h2 className="font-display text-3xl font-bold text-white">
                {p.name}
              </h2>
              <p className="mt-1 text-white/70">{p.summary}</p>
            </div>
            <div
              className="hidden shrink-0 rounded-full px-4 py-2 text-sm font-bold md:block"
              style={{
                background: p.accent,
                color: "#1a0a2a",
              }}
            >
              Explore →
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={scrollNext}
        aria-label="Scroll to next planet"
        className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition hover:scale-110"
      >
        <ChevronDown size={28} />
      </button>
    </div>
  );
}
