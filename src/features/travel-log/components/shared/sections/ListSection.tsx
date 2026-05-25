type ListSectionProps = {
  items?: string[];
  title?: string;
  layout?: "bullets" | "badges" | "pills" | "cards" | "rows";
  emptyText?: string;
  colorVariant?: string;
};

export const ListSection = ({
  items,
  title,
  layout = "bullets",
  emptyText = "No items added yet.",
  colorVariant
}: ListSectionProps) => {
  const isEmpty = !items || items.length === 0;

  return (
    <div>
      {title && (
        <h4 className="text-sm mb-2 font-semibold uppercase tracking-[0.14em] text-stone-400">
          {title}
        </h4>
      )}

      {isEmpty ? (
        emptyText ? (
          <p className="text-sm text-stone-400">{emptyText}</p>
        ) : null
      ) : (
        <>
          {layout === "bullets" && (
            <ul className="space-y-1">
              {items.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-stone-600">
                  <span className="flex-shrink-0 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {layout === "badges" && (
            <div className="space-y-1">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-6 text-stone-700"
                >
                  {item}
                </div>
              ))}
            </div>
          )}

          {layout === "pills" && (
            <div className="flex flex-wrap gap-2">
              {items.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-900 font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          )}

          {layout === "cards" && (
            <div className="grid gap-2 sm:grid-cols-2">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-stone-100 bg-stone-50 px-3 py-2 text-sm text-stone-700"
                >
                  {item}
                </div>
              ))}
            </div>
          )}

          {layout === "rows" && (
            <div className="grid gap-3">
              {items.map((item, idx) => {
                const borderClass = colorVariant === "dark" ? "border-emerald-100 hover:border-emerald-200" : "border-emerald-100 hover:border-emerald-200";
                const bgClass = colorVariant === "dark" ? "from-emerald-100/60 to-emerald-50/60" : "from-emerald-50 to-emerald-50/40";
                return (
                  <div
                    key={idx}
                    className={`rounded-xl border-2 ${borderClass} bg-gradient-to-br ${bgClass} px-4 py-3 transition hover:shadow-md`}
                  >
                    <span className="text-sm font-medium text-stone-800">{item}</span>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};