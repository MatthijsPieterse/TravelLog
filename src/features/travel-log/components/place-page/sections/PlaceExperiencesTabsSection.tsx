import {
  CircleDashed,
  CircleX,
  Footprints,
  Star,
  UtensilsCrossed,
} from "lucide-react";

import { ExperienceCard } from "#features/travel-log/components/place-page/cards/ExperienceCard";
import { TabsSection } from "#features/travel-log/components/shared/sections/TabsSection";
import type {
  AccommodationItem,
  ActivityItem,
  FoodDrinkItem,
  PlaceListGroup,
} from "#features/travel-log/types/domain/place";

type PlaceExperiencesTabsSectionProps = {
  activitiesGroups: Array<PlaceListGroup<ActivityItem>>;
  foodGroups: Array<PlaceListGroup<FoodDrinkItem>>;
  accommodations: Array<PlaceListGroup<AccommodationItem>>;
};

type GroupConfig = {
  key: string;
  tabId: string;
  label: string;
  icon: string;
  title: string;
  emptyText: string;
  HeaderIcon: typeof Footprints;
  iconClassName?: string;
};

const getGroupedItems = <T,>(groups: Array<PlaceListGroup<T>>, key: string): T[] => {
  return groups.find((group) => Array.isArray(group[key]))?.[key] ?? [];
};

export const PlaceExperiencesTabsSection = ({
  activitiesGroups,
  foodGroups,
  accommodations,
}: PlaceExperiencesTabsSectionProps) => {
  const activityConfigs: Array<GroupConfig> = [
    {
      key: "haveDone",
      tabId: "done",
      label: "Did",
      icon: "✓",
      title: "Activities you did",
      emptyText: "No completed activities added yet.",
      HeaderIcon: Footprints,
    },
    {
      key: "wantToDo",
      tabId: "todo",
      label: "To do",
      icon: "⭐",
      title: "Activities to do",
      emptyText: "No future activities added yet.",
      HeaderIcon: Star,
    },
  ];

  const foodConfigs: Array<GroupConfig> = [
    {
      key: "haveBeen",
      tabId: "been",
      label: "Visited",
      icon: "✓",
      title: "Food & drinks you visited",
      emptyText: "No food or drink places added yet.",
      HeaderIcon: UtensilsCrossed,
    },
    {
      key: "wantToGo",
      tabId: "wantto",
      label: "Want to try",
      icon: "⭐",
      title: "Food & drinks to try",
      emptyText: "No future food or drink spots added yet.",
      HeaderIcon: CircleDashed,
    },
    {
      key: "dontGo",
      tabId: "skip",
      label: "Skip",
      icon: "✗",
      title: "Skip / don't go",
      emptyText: "No places marked as skip yet.",
      HeaderIcon: CircleX,
      iconClassName: "border-rose-200 bg-rose-50 text-rose-700",
    },
  ];

  const accommodationItems = getGroupedItems(accommodations, "haveStayed");

  const activitySubTabs = activityConfigs
    .map((config) => ({ ...config, items: getGroupedItems(activitiesGroups, config.key) }))
    .filter(({ items }) => items.length > 0);

  const foodSubTabs = foodConfigs
    .map((config) => ({ ...config, items: getGroupedItems(foodGroups, config.key) }))
    .filter(({ items }) => items.length > 0);

  const tabs = [
    { id: "activities", label: "Activities", icon: "🚶" },
    { id: "food", label: "Food & Drinks", icon: "🍽️" },
    { id: "accommodations", label: "Accommodations", icon: "🏨" },
  ];

  const renderCards = (items: Array<ActivityItem | FoodDrinkItem | AccommodationItem>, category: "activity" | "food" | "stay") => (
    <div className="grid gap-4 xl:grid-cols-2">
      {items.map((item, index) => (
        <ExperienceCard key={`${category}-${item.name}-${index}`} item={item} category={category} />
      ))}
    </div>
  );

  return (
    <TabsSection tabs={tabs} variant="primary">
      {(activeTabId: string) => {
        if (activeTabId === "activities") {
          return (
            <TabsSection tabs={activitySubTabs.map(({ tabId, label, icon }) => ({ id: tabId, label, icon }))} variant="secondary">
              {(innerTabId: string) => {
                const activeGroup = activitySubTabs.find(({ tabId }) => tabId === innerTabId);
                if (!activeGroup) return null;

                return (
                  <section className="space-y-4">
                    {renderCards(activeGroup.items, "activity")}
                  </section>
                );
              }}
            </TabsSection>
          );
        }

        if (activeTabId === "food") {
          return (
            <TabsSection tabs={foodSubTabs.map(({ tabId, label, icon }) => ({ id: tabId, label, icon }))} variant="secondary">
              {(innerTabId: string) => {
                const activeGroup = foodSubTabs.find(({ tabId }) => tabId === innerTabId);
                if (!activeGroup) return null;

                return (
                  <section className="space-y-4">
                    {renderCards(activeGroup.items, "food")}
                  </section>
                );
              }}
            </TabsSection>
          );
        }

        if (activeTabId === "accommodations") {
          return (
            <section className="space-y-4">
              {renderCards(accommodationItems, "stay")}
            </section>
          );
        }

        return null;
      }}
    </TabsSection>
  );
};

