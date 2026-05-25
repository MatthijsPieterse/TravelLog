import type { FoodCulture } from "#features/travel-log/types/domain/nation";
import { ListSection } from "#features/travel-log/components/shared/sections/ListSection";

type FoodCultureSectionProps = {
  foodCulture?: FoodCulture;
};

export const FoodCultureSection = ({ foodCulture }: FoodCultureSectionProps) => {
  if (!foodCulture) return null;

  const dishes = foodCulture.mustTryDishes?.filter(Boolean) ?? [];
  const notes = foodCulture.foodNotes?.filter(Boolean) ?? [];

  if (dishes.length === 0 && notes.length === 0) return null;

  return (
    <div className="space-y-4">
      <ListSection items={dishes} title="Must-Try Dishes" layout="cards" />
      <ListSection items={notes} title="Food Tips" layout="bullets" />
    </div>
  );
};

