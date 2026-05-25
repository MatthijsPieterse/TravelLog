import { MapPinned } from "lucide-react";

import { StatCard } from "#features/travel-log/components/shared/cards/StatCard";
import ImgCarousel from "#features/travel-log/components/shared/media/ImgCarousel";
import type { PlaceEntry } from "#features/travel-log/types/domain/place";

type PlaceOverviewSectionProps = { entry: PlaceEntry | null; overviewCarouselImages: string[] };

export const PlaceOverviewSection = ({ entry, overviewCarouselImages }: PlaceOverviewSectionProps) => (
  <section className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/60 via-white to-white p-5 shadow-sm sm:p-6">
    <div className="mb-4 flex items-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-2xl border border-emerald-200 bg-white text-emerald-700">
        <MapPinned className="size-5" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-stone-950">Place overview</h2>
        <p className="text-sm text-stone-500">Core impression, ratings, and practical feel</p>
      </div>
    </div>

    {entry?.description?.intro ? (
      <p className="mb-5 text-sm leading-7 text-stone-700">{entry.description.intro}</p>
    ) : (
      <p className="mb-5 text-sm text-stone-400">No intro added yet.</p>
    )}

    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <StatCard label="Overall rating" value={entry?.summary?.overallRating} />
      <StatCard label="Affordability" value={entry?.summary?.affordability} />
      <StatCard label="Food rating" value={entry?.summary?.foodRating} />
      <StatCard label="Nightlife" value={entry?.summary?.nightlife} />
      <StatCard label="Walkability" value={entry?.summary?.walkability} />
      <StatCard label="Public transport" value={entry?.summary?.publicTransport} />
    </div>

    <div className="mt-7">
      <ImgCarousel images={overviewCarouselImages} height="lg" autoRotate />
    </div>
  </section>
);

