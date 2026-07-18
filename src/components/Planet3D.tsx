import type { CSSProperties } from "react";
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
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: size,
        height: size,
        ...style,
      }}
    >
      {withRing && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: size * 1.8,
            height: size * 0.35,
            transform: "translate(-50%, -50%) rotate(-18deg)",
            borderRadius: "50%",
            border: `${Math.max(2, size * 0.04)}px solid ${planet.accent}`,
            boxShadow: `0 0 20px ${planet.accent}55`,
            opacity: 0.7,
          }}
        />
      )}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: planet.color,
          boxShadow: `0 0 ${size * 0.6}px ${planet.accent}66, inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0,0,0,0.55)`,
        }}
      />
    </div>
  );
}
