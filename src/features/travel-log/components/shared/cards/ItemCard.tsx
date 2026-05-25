import type { ReactNode } from "react";
import { ListSection } from "#features/travel-log/components/shared/sections/ListSection";

export type ItemCardProps = {
  title: string;
  subtitle?: string;
  content?: string | string[];
  icon?: ReactNode;
  badge?: { label: string; color: string };
  tags?: string[];
  links?: { url: string; icon: ReactNode; label: string }[];
  emoji?: string;
  actions?: ReactNode;
  className?: string;
  hoverEffect?: boolean;
};

export const ItemCard = ({
  title,
  subtitle,
  content,
  icon,
  badge,
  tags,
  links,
  emoji,
  actions,
  className = "",
  hoverEffect = true,
}: ItemCardProps) => {
  return (
    <div
      className={`rounded-lg border border-stone-200 bg-white p-3 ${
        hoverEffect ? "hover:shadow-sm transition" : ""
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {icon && <div className="flex-shrink-0">{icon}</div>}
            {emoji && <span className="text-lg flex-shrink-0">{emoji}</span>}
            <div className="min-w-0">
              <h3 className="font-semibold text-stone-900 truncate">{title}</h3>
              {subtitle && <p className="text-xs text-stone-600 truncate">{subtitle}</p>}
            </div>
          </div>

          {badge && (
            <div className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${badge.color}`}>
              {badge.label}
            </div>
          )}

          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {(links || actions) && (
          <div className="flex gap-1 flex-shrink-0">
            {links?.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-lg p-1 transition hover:bg-stone-100"
                title={link.label}
              >
                {link.icon}
              </a>
            ))}
            {actions}
          </div>
        )}
      </div>

      {content && (
        <div className="mt-2">
          {typeof content === "string" ? (
            <p className="text-xs text-stone-600 line-clamp-2">{content}</p>
          ) : (
            <ListSection items={content} layout="bullets" />
          )}
        </div>
      )}
    </div>
  );
};

