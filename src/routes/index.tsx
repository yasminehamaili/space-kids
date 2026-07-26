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
    <div className="relative flex flex-col items-center overflow-hidden" style={{ Height: "100px" }}>
      <div className="mt-4 text-center">
        <h1 className="font-display text-4xl text-white drop-shadow md:text-6xl">
        Welcome, Space Explorer!
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-white/80 md:text-lg">
          Click any planet to zoom in or start the tour!
        </p>
      </div>

      {/* Orbit system */}
      <div
        className="relative mt-8"
        style={{ width: "min(90vw, 1200px)", height: "min(90vw, 1200px)" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Sun */}
        <img
          src="/sun.png"
          alt="The Sun"
          className="sun-glow rounded-full"
          style={{
            width: 100,
            height: 100,
            objectFit: "cover",
          }}
        />

          {planets.map((p) => {
            const maxR = 540;
            const containerSize = Math.min(
              typeof window !== "undefined" ? window.innerWidth : 1200,
              1200,
            );
            const r = (p.orbitRadius / maxR) * (containerSize * 0.42) * 0.9;
            return (
              <div
                key={p.id}
                className="pointer-events-none absolute left-1/2 top-1/2"
                style={{
                  width: r * 2,
                  height: r * 2,
                  marginLeft: -r,
                  marginTop: -r,
                  borderRadius: "50%",
                  border: "1px dashed rgba(255,255,255,0.12)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    animation: `orbit-spin ${p.orbitDuration}s linear infinite`,
                    transformOrigin: "50% 50%",
                  }}
                >
                  <div
                    className="absolute"
                    style={{
                      top: 0,
                      left: "50%",
                      width: p.size,
                      height: p.size,
                      marginLeft: -p.size / 2,
                      marginTop: -p.size / 2,
                    }}
                  >
                    <div
                      className="pointer-events-auto cursor-pointer transition-transform hover:scale-125"
                      style={{
                        width: p.size,
                        height: p.size,
                        animation: `counter-spin ${p.orbitDuration}s linear infinite`,
                        transformOrigin: "50% 50%",
                      }}
                      onClick={(e) => handlePlanetClick(e, p.id)}
                      title={p.name}
                    >
                      <PlanetSphere planet={p} size={p.size} withRing={p.id === "saturn"} />
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
        className="mt-6 rounded-full border border-white/30 bg-white/10 px-10 py-5 font-display text-xl  text-white backdrop-blur-md transition hover:scale-105 hover:bg-white/20 hover:shadow-2xl"
        
      >
      Start Exploring
      </button>
    </div>
  );
}
