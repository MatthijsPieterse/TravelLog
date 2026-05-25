import { DetailPanel } from "#features/travel-log/components/shared/sections/DetailPanel";
import { ListSection } from "#features/travel-log/components/shared/sections/ListSection";
import type { PlaceEntry } from "#features/travel-log/types/domain/place";

type PlaceQuickNotesSectionProps = { entry: PlaceEntry | null };

export const PlaceQuickNotesSection = ({ entry }: PlaceQuickNotesSectionProps) => (
  <DetailPanel title="Quick notes">
    <div className="space-y-5">
      <ListSection title="Pros" items={entry?.description?.pros} layout="badges" emptyText="No pros added yet." />
      <ListSection title="Cons" items={entry?.description?.cons} layout="badges" emptyText="No cons added yet." />
      <ListSection title="Tips" items={entry?.description?.tips} layout="badges" emptyText="No tips added yet." />
    </div>
  </DetailPanel>
);

