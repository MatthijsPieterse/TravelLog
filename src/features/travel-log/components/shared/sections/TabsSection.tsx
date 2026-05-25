import type { ReactNode } from "react";
import { useMemo, useState } from "react";

export type TabItem = {
  id: string;
  label: string;
  icon?: string;
};

type TabsVariant = "primary" | "secondary";

type TabsSectionProps = {
  tabs: TabItem[];
  defaultTabId?: string;
  onTabChange?: (tabId: string) => void;
  children: ((tabId: string) => ReactNode) | ReactNode;
  variant?: TabsVariant;
};

export const TabsSection = ({
  tabs,
  defaultTabId,
  onTabChange,
  children,
  variant = "primary",
}: TabsSectionProps) => {
  const initialActiveTabId = useMemo(() => {
    const validDefaultTab = tabs.find((t) => t.id === defaultTabId);
    if (validDefaultTab) {
      return validDefaultTab.id;
    }

    return tabs[0]?.id || "";
  }, [tabs, defaultTabId]);

  const [activeTabId, setActiveTabId] = useState(initialActiveTabId);

  const resolvedActiveTabId = useMemo(() => {
    if (tabs.some((t) => t.id === activeTabId)) {
      return activeTabId;
    }

    return initialActiveTabId;
  }, [activeTabId, initialActiveTabId, tabs]);

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    onTabChange?.(tabId);
  };

  const isSecondary = variant === "secondary";

  return (
    <div
      className={
        isSecondary
          ? "w-full min-w-0"
          : "w-full max-w-[calc(100vw-2rem)] min-w-0 overflow-hidden rounded-xl border border-stone-200 bg-white/90 shadow-sm"
      }
    >
      <div
        className={
          isSecondary
            ? "w-full overflow-x-auto"
            : "w-full overflow-x-auto border-b border-stone-200 bg-stone-50/50"
        }
      >
        <div
          className={
            isSecondary
              ? "flex min-w-max gap-2 px-3 py-1"
              : "flex min-w-max"
          }
        >
          {tabs.map((tab) => {
            const isActive = resolvedActiveTabId === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={
                  isSecondary
                    ? `
                      flex shrink-0 items-center gap-2 rounded-full px-4 py-2
                      text-sm font-medium transition-all whitespace-nowrap
                      ${
                        isActive
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900"
                      }
                    `
                    : `
                      flex shrink-0 items-center gap-2 px-4 py-3
                      text-sm font-medium transition-colors whitespace-nowrap
                      ${
                        isActive
                          ? "border-b-2 border-emerald-600 bg-emerald-50/30 text-emerald-700"
                          : "text-stone-600 hover:text-stone-900"
                      }
                    `
                }
              >
                {tab.icon && <span>{tab.icon}</span>}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className={isSecondary ? "min-w-0 pt-2" : "min-w-0 overflow-hidden p-5"}>
        {typeof children === "function"
          ? (children as (tabId: string) => React.ReactNode)(resolvedActiveTabId)
          : children}
      </div>
    </div>
  );
};
