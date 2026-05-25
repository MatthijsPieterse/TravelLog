import type { ReactNode } from "react";
import {
  Building2,
  ChevronRight,
  Globe2,
  MapPinned,
  Mountain,
} from "lucide-react";
import { Link } from "react-router-dom";

import type { TravelCardItem } from "#features/travel-log/types/view/travelCard";

const getIconForType = (type: TravelCardItem["type"]) => {
  switch (type) {
    case "region":
      return <Globe2 className="size-5" />;
    case "nation":
      return <Building2 className="size-5" />;
    case "territory":
      return <Mountain className="size-5" />;
    case "place":
      return <MapPinned className="size-5" />;
    default:
      return <Globe2 className="size-5" />;
  }
};

type OverviewCardProps = TravelCardItem & {
  children?: ReactNode;
};

export const OverviewCard = ({
  href,
  name,
  subtitle,
  filled,
  type,
  imageSrc,
  children,
}: OverviewCardProps) => {
  const content = (
    <div
      className={[
        "group relative flex min-h-[132px] flex-col justify-between overflow-hidden rounded-3xl border p-4 transition-all",
        filled
          ? "border-stone-300 bg-white shadow-sm hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50/40 hover:shadow-md"
          : "border-stone-200 bg-stone-100/90 text-stone-400",
      ].join(" ")}
    >
      {filled && imageSrc ? (
  <>
    <img
      src={imageSrc}
      alt=""
      className="absolute inset-0 h-full w-full object-cover opacity-50"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-emerald/40 to-transparent" />
  </>
) : null}

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div
          className={[
            "flex size-11 items-center justify-center rounded-2xl border",
            filled
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-stone-200 bg-stone-200 text-stone-400",
          ].join(" ")}
        >
          {children ?? getIconForType(type)}
        </div>

        {filled ? (
          <ChevronRight className="mt-1 size-4 text-stone-400 transition-transform group-hover:translate-x-0.5" />
        ) : null}
      </div>

      <div className="relative z-10">
        <div
          className={[
            "line-clamp-2 text-sm font-semibold md:text-base",
            filled ? "text-stone-900" : "text-stone-500",
          ].join(" ")}
        >
          {name}
        </div>
        <div className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-600">
          {subtitle ?? (filled ? "Documented" : "No details yet")}
        </div>
      </div>
    </div>
  );

  if (!href || !filled) {
    return content;
  }

  return <Link to={href}>{content}</Link>;
};


