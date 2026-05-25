import { OverviewCard } from "#features/travel-log/components/shared/cards/OverviewCard";
import type { TravelCardItem } from "#features/travel-log/types/view/travelCard";

type CardGridSectionProps = {
  title: string;
  items: TravelCardItem[];
  gridClassName?: string;
};

const SectionTitle = ({ title, count }: { title: string; count: number }) => {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-xl font-semibold text-stone-900">{title}</h2>
      <span className="text-xs uppercase tracking-[0.16em] text-stone-400">{count} total</span>
    </div>
  );
};

export const CardGridSection = ({
  title,
  items,
  gridClassName = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}: CardGridSectionProps) => {
  return (
    <section>
      <SectionTitle title={title} count={items.length} />
      <div className={gridClassName}>
        {items.map((item) => (
          <OverviewCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};


