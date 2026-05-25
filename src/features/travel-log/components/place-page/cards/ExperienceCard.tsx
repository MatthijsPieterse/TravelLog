import { CircleCheck, CircleDashed, CircleX } from "lucide-react";

import type { ExperienceItem } from "#features/travel-log/types/domain/place";
import { getRecommendStatus, getRecommendValue, hasValue } from "#features/travel-log/utils/valueUtils";

type ExperienceCardProps = {
  item: ExperienceItem;
  category: "activity" | "food" | "stay";
};

type CompactInfoProps = {
  label: string;
  value?: string | null;
};

const CompactInfo = ({ label, value }: CompactInfoProps) => {
  if (!hasValue(value)) {
    return null;
  }

  return (
    <span className="rounded-full border border-stone-200 bg-white px-2.5 py-1 text-xs text-stone-600">
      <span className="font-medium text-stone-800">{label}:</span> {value}
    </span>
  );
};

const getTonePresentation = (tone: NonNullable<ReturnType<typeof getRecommendStatus>>) => {
  if (tone.tone === "positive") {
    return {
      icon: <CircleCheck className="size-4" />,
      className: "border border-emerald-200 bg-emerald-50 text-emerald-700",
    };
  }

  if (tone.tone === "negative") {
    return {
      icon: <CircleX className="size-4" />,
      className: "border border-rose-200 bg-rose-50 text-rose-700",
    };
  }

  return {
    icon: <CircleDashed className="size-4" />,
    className: "border border-stone-200 bg-stone-100 text-stone-600",
  };
};

export const ExperienceCard = ({ item }: ExperienceCardProps) => {
  const recommendStatus = getRecommendStatus(getRecommendValue(item));
  const tonePresentation = recommendStatus ? getTonePresentation(recommendStatus) : null;

  return (
    <article className="rounded-[24px] border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-stone-950">{item.name}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            <CompactInfo label="Type" value={item.type} />
            {"cuisine" in item ? <CompactInfo label="Cuisine" value={item.cuisine} /> : null}
            <CompactInfo label="Price" value={item.price} />
          </div>
        </div>

        {tonePresentation && recommendStatus ? (
          <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${tonePresentation.className}`}>
            {tonePresentation.icon}
            {recommendStatus.label}
          </div>
        ) : null}
      </div>

      {item.comments?.length ? (
        <div className="mt-4 space-y-2">
          {item.comments.filter(hasValue).map((comment, index) => (
            <div key={`${item.name}-comment-${index}`} className="rounded-2xl bg-stone-50 px-3 py-2 text-sm leading-6 text-stone-700">
              {comment}
            </div>
          ))}
        </div>
      ) : null}

      {hasValue(item.lastUpdated) ? (
        <div className="mt-4 text-xs uppercase tracking-[0.14em] text-stone-400">
          Updated {item.lastUpdated}
        </div>
      ) : null}
    </article>
  );
};

