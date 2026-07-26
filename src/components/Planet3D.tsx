import React, { type CSSProperties } from "react";
import type { Planet } from "@/lib/planets";

export function PlanetSphere({
  planet,
  size,
  withRing,
  style,
  className,
}: {
  planet: Planet;
  size: number;
  withRing?: boolean;
  style?: CSSProperties;
  className?: string;
}) {
  return React.createElement("img", {
    src: planet.image,
    alt: planet.name,
  });
}
