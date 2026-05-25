import { MapPinned } from "lucide-react";

import { StatCard } from "#features/travel-log/components/shared/cards/StatCard";
import ImgCarousel from "#features/travel-log/components/shared/media/ImgCarousel";
import type { NationDataEntry } from "#features/travel-log/types/domain/nation";

type NationOverviewSectionProps = { allImages: string[]; dataEntry: NationDataEntry };

export const NationOverviewSection = ({ allImages, dataEntry }: NationOverviewSectionProps) => (
  <section className="rounded-[28px] border border-emerald-200 bg-gradient-to-br from-white via-emerald-50/40 to-emerald-100/10 p-5 shadow-sm sm:p-6">
    <div className="mb-4 flex items-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-2xl border border-emerald-200 bg-white text-emerald-700">
        <MapPinned className="size-5" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-stone-950">Overview</h2>
        <p className="text-sm text-stone-500">First impression and key details</p>
      </div>
    </div>
    <p className="mb-5 text-sm leading-7 text-stone-700">{dataEntry.description?.intro}</p>
    <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <StatCard label="Overall" value={dataEntry.summary?.overallRating} />
      <StatCard label="Affordability" value={dataEntry.summary?.affordability} />
      <StatCard label="Transport" value={dataEntry.summary?.transportRating} />
      <StatCard label="Food" value={dataEntry.summary?.foodRating} />
      <StatCard label="Return" value={dataEntry.summary?.returnInterest?.level} description={dataEntry.summary?.returnInterest?.note}/>
    </div>
    {allImages.slice(1, 4).length > 0 && (
      <div className="mt-5">
        <ImgCarousel images={allImages.slice(1, 4)} height="md" imgPosition="object-[50%_60%]" autoRotate />
      </div>
    )}
  </section>
);

