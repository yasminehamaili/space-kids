import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPlanet } from "@/lib/planets";
import { PlanetSphere } from "@/components/Planet3D";

export const Route = createFileRoute("/planet/$id/resources")({
  loader: ({ params }) => {
    const planet = getPlanet(params.id);
    if (!planet) throw notFound();
    return { planet };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.planet.name} Resources: Space Kids` },
          {
            name: "description",
            content: `Learn more about ${loaderData.planet.name} with videos and articles.`,
          },
        ]
      : [{ title: "Resources: Space Kids" }],
  }),
  component: Resources,
});

function Resources() {
  const { planet } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="mb-6 flex items-center gap-4">
        <PlanetSphere planet={planet} size={80} withRing={planet.id === "saturn"} />
        <div>
          <div className="text-xs uppercase tracking-widest text-white/50">Resources</div>
          <h1
            className="font-display text-4xl md:text-5xl"
            style={{ color: planet.accent }}
          >
            All about {planet.name}
          </h1>
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${planet.videoId}`}
            title={`${planet.name} video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <div className="glass-panel mt-6 p-6">
        <h2 className="font-display text-2xl text-white"> Quick summary</h2>
        <p className="mt-3 text-lg leading-relaxed text-white/85">
          {planet.summary} {planet.facts.funFacts.join(" ")}
        </p>
        <a
          href={planet.wiki}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-full px-5 py-2 shadow-lg transition hover:scale-105"
          style={{ background: planet.accent, color: "#1a0a2a" }}
        >
          Read more on Wikipedia ↗
        </a>
      </div>

      <div className="mt-8 flex justify-between">
        <Link
          to="/planet/$id"
          params={{ id: planet.id }}
          className="glass-panel px-4 py-2 text-white hover:border-white/30"
        >
          ← Back to {planet.name}
        </Link>
        <Link to="/planets" className="glass-panel px-4 py-2 text-white hover:border-white/30">
          All planets
        </Link>
      </div>
    </div>
  );
}
