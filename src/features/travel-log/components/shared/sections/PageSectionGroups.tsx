import { CardGridSection } from "#features/travel-log/components/shared/sections/CardGridSection";
import type { TravelCardItem } from "#features/travel-log/types/view/travelCard";
import { splitByContent } from "#features/travel-log/utils/travelLogUtils";

type PageSectionGroupsProps = {
  filledTitle: string;
  emptyTitle: string;
  items: TravelCardItem[];
  gridClassName?: string;
  emptyBorderClassName?: string;
};

export const PageSectionGroups = ({
  filledTitle,
  emptyTitle,
  items,
  gridClassName,
  emptyBorderClassName = "border-stone-300",
}: PageSectionGroupsProps) => {
  const { filled, empty } = splitByContent(items, (item) => item.filled);

  return (
    <div className="space-y-10">
      <div className="p-5">
      {filled.length ? <CardGridSection title={filledTitle} items={filled} gridClassName={gridClassName} /> : null}
</div>
      {empty.length ? (
        <div className={`border-t border-dashed p-5 ${emptyBorderClassName}`}>
          <CardGridSection title={emptyTitle} items={empty} gridClassName={gridClassName} />
        </div>
      ) : null}
    </div>
  );
};


