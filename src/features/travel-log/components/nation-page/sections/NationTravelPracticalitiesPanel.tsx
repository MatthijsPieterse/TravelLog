import { TravelPracticalitiesSection } from "#features/travel-log/components/nation-page/sections/TravelPracticalitiesSection";
import type { TravelPracticalities } from "#features/travel-log/types/domain/nation";

type NationTravelPracticalitiesPanelProps = { practicalities: TravelPracticalities };

export const NationTravelPracticalitiesPanel = ({ practicalities }: NationTravelPracticalitiesPanelProps) => (
  <div>
    <h2 className="mb-4 text-lg font-semibold text-stone-900">✈️ Travel Practicalities</h2>
    <TravelPracticalitiesSection practicalities={practicalities} />
  </div>
);

