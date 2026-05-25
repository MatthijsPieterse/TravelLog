import { DetailPanel } from "#features/travel-log/components/shared/sections/DetailPanel";
import { ListSection } from "#features/travel-log/components/shared/sections/ListSection";
import type { PlaceEntry } from "#features/travel-log/types/domain/place";

type PlaceNotesSectionProps = { entry: PlaceEntry | null };

export const PlaceNotesSection = ({ entry }: PlaceNotesSectionProps) => (
  <div className="grid gap-5 xl:grid-cols-2">
    <DetailPanel title="Things to know">
      <ListSection items={entry?.description?.thingsToKnow} layout="badges" />
    </DetailPanel>

    <DetailPanel title="Personal notes">
      <ListSection items={entry?.description?.personalNotes} layout="badges" emptyText="No personal notes yet." />
    </DetailPanel>
  </div>
);

