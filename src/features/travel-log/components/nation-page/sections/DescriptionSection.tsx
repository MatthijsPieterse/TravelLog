import type { NationDescription } from "#features/travel-log/types/domain/nation";
import { ListSection } from "#features/travel-log/components/shared/sections/ListSection";

type DescriptionSectionProps = {
  description?: NationDescription;
};

export const DescriptionSection = ({ description }: DescriptionSectionProps) => {
  if (!description) return null;

  const culturalNotes = description.culturalNotes?.filter(Boolean) ?? [];
  const tips = description.tips?.filter(Boolean) ?? [];
  const thingsToKnow = description.thingsToKnow?.filter(Boolean) ?? [];
  const hasContent =
    description.intro ||
    (description.standouts?.length ?? 0) > 0 ||
    culturalNotes.length > 0 ||
    tips.length > 0 ||
    thingsToKnow.length > 0;

  if (!hasContent) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <ListSection items={description.standouts} title="✨ Key Takeaways" layout="bullets" />
        <ListSection items={tips} title="💡 Tips" layout="bullets" />
        <ListSection items={thingsToKnow} title="📌 Things to Know" layout="bullets" />
        <ListSection items={culturalNotes} title="🎭 Cultural Notes" layout="bullets" />
      </div>
    </div>
  );
};

