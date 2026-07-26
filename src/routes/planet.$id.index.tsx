import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { getPlanet, planets } from "@/lib/planets";
import { PlanetSphere } from "@/components/Planet3D";

export const Route = createFileRoute("/planet/$id/")({
  loader: ({ params }) => {
    const planet = getPlanet(params.id);
    if (!planet) throw notFound();
    return { planet };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.planet.name}:  Space Kids` },
          { name: "description", content: loaderData.planet.summary },
        ]
      : [{ title: "Planet: Space Kids" }],
  }),
  component: PlanetDetail,
});

function PlanetDetail() {
  const { planet } = Route.useLoaderData();
  const planetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const origin = (() => {
      try {
        const raw = sessionStorage.getItem("planet-origin");
        return raw ? (JSON.parse(raw) as { x: number; y: number; size: number }) : null;
      } catch {
        return null;
      }
    })();

    if (planetRef.current) {
      const target = planetRef.current.getBoundingClientRect();
      if (origin) {
        const dx = origin.x - (target.left + target.width / 2);
        const dy = origin.y - (target.top + target.height / 2);
        const startScale = Math.max(0.1, origin.size / target.width);
        gsap.fromTo(
          planetRef.current,
          { x: dx, y: dy, scale: startScale, opacity: 0.4 },
          { x: 0, y: 0, scale: 1, opacity: 1, duration: 1.1, ease: "power3.out" },
        );
      } else {
        gsap.fromTo(
          planetRef.current,
          { scale: 0.2, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.6)" },
        );
      }
    }
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, delay: 0.4, ease: "power2.out" },
      );
    }
    sessionStorage.removeItem("planet-origin");
  }, [planet.id]);

  const prev = planets[(planet.order - 2 + planets.length) % planets.length];
  const next = planets[planet.order % planets.length];

  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="flex justify-center">
          <div ref={planetRef}>
            <PlanetSphere
              planet={planet}
              size={260}
              withRing={planet.id === "saturn"}
            />
          </div>
        </div>

        <div ref={contentRef}>
          <div className="text-sm uppercase tracking-widest text-white/50">
            Planet #{planet.order}
          </div>
          <h1
            className="font-display text-5xl md:text-6xl"
            style={{ color: planet.accent }}
          >
            {planet.name}
          </h1>
          <p className="mt-3 text-lg text-white/80">{planet.summary}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Fact label="Size" value={planet.facts.diameter} />
            <Fact label="Distance" value={planet.facts.distance} />
            <Fact label="Moons" value={planet.facts.moons} />
            <Fact label="Temperature" value={planet.facts.temperature} />
          </div>

          <div className="glass-panel mt-4 p-4">
            <div className="mb-2 text-sm uppercase tracking-wider text-white/70">
              Fun facts:
            </div>
            <ul className="space-y-1 text-white/90">
              {planet.facts.funFacts.map((f: string, i: number) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>
          </div>

          <Link
            to="/planet/$id/resources"
            params={{ id: planet.id }}
            className="mt-6 inline-block rounded-full px-6 py-3 font-display text-lg shadow-lg transition hover:scale-105"
            style={{
              background: planet.accent,
              color: "#1a0a2a",
              boxShadow: `0 10px 40px ${planet.accent}55`,
            }}
          >
            Learn more →
          </Link>
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between">
        <Link
          to="/planet/$id"
          params={{ id: prev.id }}
          className="glass-panel px-4 py-2 text-white hover:border-white/30"
        >
          ← {prev.name}
        </Link>
        <Link to="/planets" className="text-white/60 hover:text-white">
          All planets
        </Link>
        <Link
          to="/planet/$id"
          params={{ id: next.id }}
          className="glass-panel px-4 py-2 text-white hover:border-white/30"
        >
          {next.name} →
        </Link>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-panel p-3">
      <div className="text-xs uppercase tracking-wider text-white/60">{label}</div>
      <div className="text-white">{value}</div>
    </div>
  );
}
