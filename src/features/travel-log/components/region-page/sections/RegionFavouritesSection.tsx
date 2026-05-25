import { ListSection } from "#features/travel-log/components/shared/sections/ListSection";
import type { RegionFavourites } from "#features/travel-log/types/domain/region";

type RegionFavouritesSectionProps = {
  favourites?: RegionFavourites;
};

export const RegionFavouritesSection = ({ favourites }: RegionFavouritesSectionProps) => {
  const nations = favourites?.nations ?? [];
  const places = favourites?.places ?? [];

  if (nations.length === 0 && places.length === 0) return null;

  return (
    <section className="rounded-xl border border-stone-200 bg-white/90 p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-stone-900">⭐ Favourites</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <ListSection
            title="Nations"
            items={nations}
            layout="rows"
            colorVariant="dark"
            emptyText={nations.length === 0 ? "No favourite nations yet." : ""}
          />
        </div>

        <div>
          <ListSection
            title="Places"
            items={places.map((place) => `${place.name}, ${place.country}`)}
            layout="rows"
            colorVariant="light"
            emptyText={places.length === 0 ? "No favourite places yet." : ""}
          />
        </div>
      </div>
    </section>
  );
};

