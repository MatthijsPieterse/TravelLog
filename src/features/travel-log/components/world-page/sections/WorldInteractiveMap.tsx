import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { TravelLogRegion } from "#features/travel-log/types/domain/travelLogTypes";

import { slugify } from "#features/travel-log/utils/stringUtils";
import { hasTravelContent } from "#features/travel-log/utils/travelLogUtils";

import WorldMap from "#assets/images/worldMap.svg?react";
import earthTexture from "#assets/images/blueMarbleNovWorldMapOverlay.webp";

const BASE_FILL = "rgb(214 211 209)";
const HOVER_FILL = "rgb(16 185 129)";

export const WorldInteractiveMap = ({
  regions,
}: {
  regions: TravelLogRegion[];
}) => {
  const navigate = useNavigate();

  const svgRef = useRef<SVGSVGElement | null>(null);

  const [hovered, setHovered] = useState<string | null>(null);

  const visitedSet = useMemo(() => {
    return new Set(
      regions.filter(hasTravelContent).map((r) => slugify(r.name)),
    );
  }, [regions]);

  const getRegionFromEvent = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      return (e.target as Element)?.closest("g[id]")?.id ?? null;
    },
    [],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      const el = e.target as Element;

      const group = el.closest("g[id]");
      const next = group?.id ?? null;

      setHovered((prev) => {
        if (prev === next) return prev;
        return next;
      });
    },
    [],
  );

  const handlePointerLeave = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      const related = e.relatedTarget as Element | null;

      if (!related || !svgRef.current?.contains(related)) {
        setHovered(null);
      }
    },
    [],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const region = getRegionFromEvent(e);

      if (region && visitedSet.has(region)) {
        navigate(`/region/${region}`);
      }
    },
    [getRegionFromEvent, visitedSet, navigate],
  );

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const groups = svg.querySelectorAll("g[id]");

    groups.forEach((group) => {
      const id = group.id;

      const isVisited = visitedSet.has(id);
      const isHovered = hovered === id;

      const paths = group.querySelectorAll("path");

      paths.forEach((path) => {
        const nextFill = isHovered
          ? HOVER_FILL
          : isVisited
            ? "rgba(0,0,0,0)"
            : BASE_FILL;

        const nextOpacity = isVisited ? "1" : "0.65";

        if (path.style.fill !== nextFill) {
          path.style.fill = nextFill;
        }

        if (path.style.opacity !== nextOpacity) {
          path.style.opacity = nextOpacity;
        }

        path.style.stroke = "white";
        path.style.strokeWidth = "0.9px";
        path.style.vectorEffect = "non-scaling-stroke";
      });
    });
  }, [visitedSet, hovered]);

  return (
    <div className="overflow-x-auto md:overflow-hidden">
      <div className="relative w-[300vw] md:w-full aspect-[800/387] border border-stone-300 rounded-lg overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${earthTexture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />

        <WorldMap
          ref={svgRef}
          className="
          relative
          w-full
          h-full
          outline
          outline-2
          outline-black/75
          outline-offset-[-2px]
          [&_g]:cursor-pointer
          pointer-events-auto"
          style={{ zIndex: 10 }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onClick={handleClick}
        />

        {hovered && (
          <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-sm rounded z-50 capitalize">
            {hovered.replaceAll("_", " ")}
          </div>
        )}
      </div>

      
    </div>
  );
};

