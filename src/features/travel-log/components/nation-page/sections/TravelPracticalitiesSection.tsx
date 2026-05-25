import { TabsSection } from "#features/travel-log/components/shared/sections/TabsSection";
import { ListSection } from "#features/travel-log/components/shared/sections/ListSection";
import type { TravelPracticalities } from "#features/travel-log/types/domain/nation";

type TravelPracticalitiesSectionProps = {
  practicalities?: TravelPracticalities;
};

export const TravelPracticalitiesSection = ({ practicalities }: TravelPracticalitiesSectionProps) => {
  if (!practicalities) return null;

  // Build tabs based on available data
  const tabs = [
    {
      id: "visa-payments",
      label: "Visa & Payments",
      icon: "💳",
      hasContent: !!(practicalities.visaNotes || practicalities.currency || practicalities.paymentCulture?.length),
    },
    {
      id: "transport",
      label: "Transport",
      icon: "🚆",
      hasContent: !!(practicalities.transportTips?.length),
    },
    {
      id: "language",
      label: "Language",
      icon: "🗣️",
      hasContent: !!(practicalities.languageTips?.length),
    },
    {
      id: "packing-seasonal",
      label: "Packing & Seasonal",
      icon: "🎒",
      hasContent: !!(practicalities.packingNotes?.length || practicalities.seasonalNotes?.length),
    },
  ].filter((tab) => tab.hasContent);

  if (tabs.length === 0) return null;

  return (
    <TabsSection tabs={tabs.map(({ id, label, icon }) => ({ id, label, icon }))} variant="primary">
      {(activeTabId: string) => {
        if (activeTabId === "visa-payments") {
          return (
            <div className="space-y-4">
              {practicalities.visaNotes && (
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">Visa Requirements</h4>
                  <p className="mt-2 text-sm text-stone-600">{practicalities.visaNotes}</p>
                </div>
              )}

              {practicalities.currency && (
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">Currency</h4>
                  <p className="mt-2 text-sm text-stone-600">{practicalities.currency}</p>
                </div>
              )}

              <ListSection items={practicalities.paymentCulture} title="Payment Methods" layout="bullets" />
            </div>
          );
        }

        if (activeTabId === "transport") {
          return <ListSection items={practicalities.transportTips} title="Transport Tips" layout="bullets" />;
        }

        if (activeTabId === "language") {
          return <ListSection items={practicalities.languageTips} title="Language Tips" layout="bullets" />;
        }

        if (activeTabId === "packing-seasonal") {
          return (
            <div className="space-y-4">
              <ListSection items={practicalities.packingNotes} title="Packing Tips" layout="bullets" />

              {practicalities.seasonalNotes && practicalities.seasonalNotes.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">Seasonal Info</h4>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {practicalities.seasonalNotes.map((season, idx) => (
                      <div key={idx} className="rounded-lg border border-stone-100 bg-stone-50 p-3">
                        <p className="text-xs font-semibold text-stone-700 uppercase tracking-wide">{season.season}</p>
                        <ListSection items={season.notes} layout="bullets" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        }

        return null;
      }}
    </TabsSection>
  );
};

