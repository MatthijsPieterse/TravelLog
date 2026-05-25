import { GridSection } from "#features/travel-log/components/shared/sections/GridSection";
import { ItemCard } from "#features/travel-log/components/shared/cards/ItemCard";
import type { RegionTravelCorridor, RegionTransportType } from "#features/travel-log/types/domain/region";

type RegionTransportSystemsSectionProps = {
  transportSystems?: {
    commonTransportTypes?: RegionTransportType[];
    majorTravelCorridors?: RegionTravelCorridor[];
  };
};

const hasCorridorContent = (corridor: RegionTravelCorridor) => !!(corridor.route || corridor.transportType || corridor.notes);

export const RegionTransportSystemsSection = ({ transportSystems }: RegionTransportSystemsSectionProps) => {
  const transportTypes = transportSystems?.commonTransportTypes?.filter((transport) => transport.type || transport.notes?.length) ?? [];
  const corridors = transportSystems?.majorTravelCorridors?.filter(hasCorridorContent) ?? [];

  if (transportTypes.length === 0 && corridors.length === 0) return null;

  return (
    <section className="rounded-xl border border-stone-200 bg-white/90 p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-stone-900">🚆 Transport systems</h2>
      <div className="space-y-5">
        {transportTypes.length > 0 && (
          <GridSection
            items={transportTypes}
            columns="sm"
            renderItem={(item) => {
              const transport = item as RegionTransportType;
              return (
                <ItemCard
                  title={transport.type}
                  content={transport.notes}
                  className="bg-gradient-to-br from-white to-blue-50/50 hover:border-blue-200"
                />
              );
            }}
          />
        )}

        {corridors.length > 0 && (
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-stone-400">Major travel corridors</h3>
            <GridSection
              items={corridors}
              columns="sm"
              renderItem={(item) => {
                const corridor = item as RegionTravelCorridor;
                return (
                  <ItemCard
                    title={corridor.route}
                    subtitle={corridor.transportType}
                    content={corridor.notes}
                    className="border-emerald-200 bg-emerald-50/40"
                  />
                );
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

