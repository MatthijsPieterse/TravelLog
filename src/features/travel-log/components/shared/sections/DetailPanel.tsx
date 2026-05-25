import type { ReactNode } from "react";

type DetailPanelProps = {
  title?: string;
  children?: ReactNode;
  emptyText?: string;
  className?: string;
};

export const DetailPanel = ({
  title,
  children,
  emptyText = "Nothing added yet.",
  className = "",
}: DetailPanelProps) => {
  return (
    <section
      className={`rounded-xl border border-stone-200 bg-white/90 p-5 shadow-sm ${className}`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-stone-900 md:text-lg">
          {title}
        </h2>
      </div>
      <div className="text-sm leading-6 text-stone-600">
        {children ?? <p className="text-stone-400">{emptyText}</p>}
      </div>
    </section>
  );
};
