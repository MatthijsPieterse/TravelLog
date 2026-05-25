import { useMemo, useState } from "react";
import { Smartphone } from "lucide-react";

import type { RecommendedApp } from "#features/travel-log/types/domain/nation";
import { StoreBadge } from "#features/travel-log/components/shared/sections/StoreBadge";
import {
  formatCategory,
  getCategoryColor,
  normalizeLink,
} from "#features/travel-log/utils/recommendedAppUtils";

type RecommendedAppsSectionProps = {
  apps?: RecommendedApp[];
  title?: string;
};

export const RecommendedAppsSection = ({
  apps,
  title = "Recommended Apps",
}: RecommendedAppsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedApp, setExpandedApp] = useState<string | null>(null);

  const filledApps = useMemo(
    () => apps?.filter((app) => app?.name) ?? [],
    [apps],
  );

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(filledApps.map((app) => app.category).filter(Boolean)),
      ).sort(),
    ],
    [filledApps],
  );

  const filteredApps = useMemo(
    () =>
      filledApps.filter(
        (app) => activeCategory === "All" || app.category === activeCategory,
      ),
    [activeCategory, filledApps],
  );

  if (filledApps.length === 0) return null;

  return (
    <section className="rounded-xl border border-stone-200 bg-gradient-to-br from-white to-emerald-50/40 p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-emerald-700" />
          <h2 className="text-lg font-semibold text-stone-900">{title}</h2>
          <span className="rounded-full border border-stone-200 bg-white px-2 py-0.5 text-xs text-stone-500">
            {filledApps.length}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:ml-auto">
          {categories.length > 2 && (
            <>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setExpandedApp(null);
                  }}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                    activeCategory === category
                      ? "border-emerald-700 bg-emerald-700 text-white"
                      : "border-stone-200 bg-white text-stone-600 hover:border-emerald-300 hover:text-emerald-800"
                  }`}
                >
                  {category === "All" ? "All" : formatCategory(category)}
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 items-start gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filteredApps.map((app) => {
          const isOpen = expandedApp === app.name;
          const links = app.links?.map(normalizeLink).filter(Boolean) ?? [];

          return (
            <button
              key={app.name}
              type="button"
              onClick={() => setExpandedApp(isOpen ? null : app.name)}
              className={`rounded-lg border text-left transition select-none ${
                isOpen
                  ? "border-emerald-200 bg-white shadow-md ring-1 ring-emerald-100"
                  : "border-stone-200 bg-white/75 hover:border-emerald-200 hover:bg-white hover:shadow-sm"
              }`}
            >
              <div className="p-3">
                {app.category && (
                  <span
                    className={`mb-1.5 inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${getCategoryColor(
                      app.category,
                    )}`}
                  >
                    {formatCategory(app.category)}
                  </span>
                )}

                <p className="text-sm font-medium leading-snug text-stone-900">
                  {app.name}
                </p>
              </div>

              {isOpen && (
                <div className="space-y-2 border-t border-stone-100 px-3 pb-3 pt-2.5">
                  {app.purpose && (
                    <p className="text-xs leading-snug text-stone-600">
                      {app.purpose}
                    </p>
                  )}

                  {app.notes && (
                    <p className="text-xs italic leading-snug text-stone-400">
                      {app.notes}
                    </p>
                  )}

                  {links.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {links.map((link) =>
                        link ? (
                          <StoreBadge
                            key={`${link.title ?? "web"}-${link.url}`}
                            link={link}
                          />
                        ) : null,
                      )}
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};

