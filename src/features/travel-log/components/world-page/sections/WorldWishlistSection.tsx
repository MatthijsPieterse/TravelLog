import { GridSection } from "#features/travel-log/components/shared/sections/GridSection";
import { ItemCard } from "#features/travel-log/components/shared/cards/ItemCard";
import type { WorldWishlistItem } from "#features/travel-log/types/domain/world";
import { CollapsibleSection } from "#features/travel-log/components/shared/sections/CollapsibleSection";

type WorldWishlistSectionProps = {
  wishlist?: WorldWishlistItem[];
};

const priorityColor = (priority?: string) => {
  const normalized = priority?.toLowerCase() ?? "";
  if (normalized === "high") return "bg-emerald-100 text-emerald-700";
  if (normalized === "medium") return "bg-amber-100 text-amber-700";
  if (normalized === "low") return "bg-stone-100 text-stone-700";
  return "bg-stone-100 text-stone-700";
};

export const WorldWishlistSection = ({ wishlist }: WorldWishlistSectionProps) => {
  if (!wishlist || wishlist.length === 0) return null;

  return (
    <CollapsibleSection title="📋 Travel wishlist">
      <GridSection
        items={wishlist}
        columns="md"
        renderItem={(item) => {
          const wishlistItem = item as WorldWishlistItem;
          return (
            <ItemCard
              title={wishlistItem.name}
              subtitle={wishlistItem.type}
              content={wishlistItem.notes}
              badge={wishlistItem.priority ? { label: wishlistItem.priority, color: priorityColor(wishlistItem.priority) } : undefined}
              className="border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50"
            />
          );
        }}
      />
    </CollapsibleSection>
  );
};

