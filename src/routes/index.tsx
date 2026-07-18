import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { planets } from "@/lib/planets";
import { PlanetSphere } from "@/components/Planet3D";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();

  const handlePlanetClick = (e: React.MouseEvent, id: string) => {
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

  return (
    <div className="relative flex min-h-[calc(100vh-6rem)] flex-col items-center overflow-hidden px-4">
      <div className="mt-4 text-center">
        <h1 className="font-display text-4xl font-bold text-white drop-shadow md:text-6xl">
          🚀 Welcome, Space Explorer!
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-white/80 md:text-lg">
          Click any planet to zoom in — or start the tour!
        </p>
      </div>

      {/* Orbit system */}
      <div
        className="relative mt-8"
        style={{ width: "min(90vw, 1200px)", height: "min(90vw, 1200px)" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Sun */}
          <div
            className="sun-glow rounded-full"
            style={{
              width: 90,
              height: 90,
              background:
                "radial-gradient(circle at 40% 40%, #fff2a8, #ffb54a 55%, #ff6a1a)",
            }}
          />

          {planets.map((p) => {
            const maxR = 540;
            const scale = 0.9;
            const r = (p.orbitRadius / maxR) * (Math.min(window.innerWidth, 1200) * 0.42) * scale;
            return (
              <div
                key={p.id}
                className="pointer-events-none absolute"
                style={{
                  width: r * 2,
                  height: r * 2,
                  borderRadius: "50%",
                  border: "1px dashed rgba(255,255,255,0.12)",
                }}
              >
                <div
                  className="absolute left-1/2 top-1/2 origin-center"
                  style={{
                    width: r * 2,
                    height: r * 2,
                    transform: "translate(-50%, -50%)",
                    animation: `orbit-spin ${p.orbitDuration}s linear infinite`,
                  }}
                >
                  <div
                    className="absolute"
                    style={{
                      top: 0,
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div
                      className="pointer-events-auto cursor-pointer transition-transform hover:scale-125"
                      style={{
                        animation: `counter-spin ${p.orbitDuration}s linear infinite`,
                      }}
                      onClick={(e) => handlePlanetClick(e, p.id)}
                      title={p.name}
                    >
                      <PlanetSphere
                        planet={p}
                        size={p.size}
                        withRing={p.id === "saturn"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => navigate({ to: "/planets" })}
        className="mt-6 rounded-full bg-primary px-8 py-4 font-display text-xl font-bold text-primary-foreground shadow-lg transition hover:scale-105 hover:shadow-2xl"
        style={{ boxShadow: "0 10px 40px rgba(255, 170, 60, 0.5)" }}
      >
        ✨ Start Exploring
      </button>
    </div>
  );
}
