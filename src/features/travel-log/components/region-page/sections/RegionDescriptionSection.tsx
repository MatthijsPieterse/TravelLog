import { DetailPanel } from "#features/travel-log/components/shared/sections/DetailPanel";
import { ListSection } from "#features/travel-log/components/shared/sections/ListSection";
import type { RegionDescription } from "#features/travel-log/types/domain/region";

type RegionDescriptionSectionProps = {
  description?: RegionDescription;
};

export const RegionDescriptionSection = ({ description }: RegionDescriptionSectionProps) => {
  if (!description?.intro && !description?.tips?.length && !description?.personalNotes?.length) return null;

  return (
    <DetailPanel title="Overview">
      <div className="space-y-4">
        {description.intro && <p>{description.intro}</p>}
        <ListSection items={description.tips} title="Tips" layout="bullets" emptyText="" />
        <ListSection items={description.personalNotes} title="Personal notes" layout="badges" emptyText="" />
      </div>
    </DetailPanel>
  );
};

