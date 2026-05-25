import { ItemCard } from "#features/travel-log/components/shared/cards/ItemCard";
import { CollapsibleSection } from "#features/travel-log/components/shared/sections/CollapsibleSection";
import type { RecommendationTree } from "#features/travel-log/types/domain/common";
import { hasRecommendationContent, isRecommendationItemList, isRecommendationTree } from "#features/travel-log/utils/recommendationUtils";
import { formatKeyLabel } from "#features/travel-log/utils/stringUtils";
import { hasValue } from "#features/travel-log/utils/valueUtils";

type RecommendationsSectionProps = {
  recommendations?: RecommendationTree;
  title?: string;
  defaultOpen?: boolean;
};

type RecommendationBranchProps = {
  tree: RecommendationTree;
  depth?: number;
};

const RecommendationBranch = ({ tree, depth = 0 }: RecommendationBranchProps) => {
  const entries = Object.entries(tree).filter(([, value]) => {
    if (isRecommendationItemList(value)) {
      return value.length > 0;
    }

    if (isRecommendationTree(value)) {
      return hasRecommendationContent(value);
    }

    return false;
  });

  if (!entries.length) {
    return null;
  }

  return (
    <div className={depth === 0 ? "space-y-5" : "space-y-4"}>
      <div className={depth === 0 ? "grid gap-5 lg:grid-cols-2" : "space-y-4"}>
        {entries.map(([key, value]) => {
          const sectionTitle = formatKeyLabel(key);

          if (isRecommendationItemList(value)) {
            return (
              <div key={`${sectionTitle}-${depth}`}>
                <h3 className="mb-3 text-sm font-semibold text-stone-900">{sectionTitle}</h3>
                <div className="space-y-2">
                  {value.map((item, index) => {
                    const notes = item.notes?.filter(hasValue);
                    return (
                      <ItemCard
                        key={`${item.name}-${sectionTitle}-${index}`}
                        title={item.name}
                        badge={{
                          label: `Area: ${item.area}`,
                          color: "bg-stone-100",
                        }}
                        content={notes?.join(" • ")}
                        className="rounded-2xl border-stone-200 bg-stone-50"
                      />
                    );
                  })}
                </div>
              </div>
            );
          }

          if (isRecommendationTree(value)) {
            return (
              <section key={`${sectionTitle}-${depth}`} className="rounded-2xl border border-stone-100 bg-stone-50/60 p-4 md:p-5">
                <h3 className="mb-4 text-sm font-semibold text-stone-900">{sectionTitle}</h3>
                <RecommendationBranch tree={value} depth={depth + 1} />
              </section>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export const RecommendationsSection = ({
  recommendations,
  title = "Extra recommendations from others",
  defaultOpen = false,
}: RecommendationsSectionProps) => {
  if (!hasRecommendationContent(recommendations)) {
    return null;
  }

  return (
    <CollapsibleSection title={title} defaultOpen={defaultOpen}>
      <RecommendationBranch tree={recommendations!} />
    </CollapsibleSection>
  );
};

