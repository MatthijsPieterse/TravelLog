import type { ReactNode } from "react";

type GridSectionProps = {
  items: unknown[];
  renderItem: (item: unknown, idx: number) => ReactNode;
  columns?: "auto" | "sm" | "md" | "lg";
  gap?: "sm" | "md" | "lg";
  emptyMessage?: string;
};

const getColumnClass = (columns: string) => {
  switch (columns) {
    case "sm":
      return "sm:grid-cols-2";
    case "md":
      return "md:grid-cols-2 lg:grid-cols-3";
    case "lg":
      return "lg:grid-cols-3 xl:grid-cols-4";
    default:
      return "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  }
};

const getGapClass = (gap: string) => {
  switch (gap) {
    case "sm":
      return "gap-2";
    case "lg":
      return "gap-5";
    default:
      return "gap-3";
  }
};

export const GridSection = ({
  items,
  renderItem,
  columns = "auto",
  gap = "md",
  emptyMessage = "No items to display.",
}: GridSectionProps) => {
  if (!items || items.length === 0) {
    return <div className="text-sm text-stone-400">{emptyMessage}</div>;
  }

  return (
    <div className={`grid ${getColumnClass(columns)} ${getGapClass(gap)}`}>
      {items.map((item, idx) => (
        <div key={idx}>{renderItem(item, idx)}</div>
      ))}
    </div>
  );
};
