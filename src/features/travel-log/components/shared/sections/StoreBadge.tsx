import { Download, Globe } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import type { AppLink } from "#features/travel-log/utils/recommendedAppUtils";

const APP_STORE_ICON = new URL("../../../../../assets/icons/App-Store-IOS.svg", import.meta.url).href;
const PLAY_STORE_ICON = new URL("../../../../../assets/icons/Google-play-store.svg", import.meta.url).href;
const FDROID_ICON = new URL("../../../../../assets/icons/F-Droid.svg", import.meta.url).href;
const DROIDIFY_ICON = new URL("../../../../../assets/icons/Droid-ify.svg", import.meta.url).href;

type StoreBadgeIcon =
  | { type: "image"; src: string }
  | { type: "component"; icon: ComponentType<SVGProps<SVGSVGElement>> };

const STORE_BADGES: ReadonlyArray<{ test: RegExp; icon: StoreBadgeIcon }> = [
  {
    test: /app\s?store|apple/i,
    icon: { type: "image", src: APP_STORE_ICON },
  },
  {
    test: /play/i,
    icon: { type: "image", src: PLAY_STORE_ICON },
  },
  {
    test: /fdroid/i,
    icon: { type: "image", src: FDROID_ICON },
  },
  {
    test: /droidify|droid ify/i,
    icon: { type: "image", src: DROIDIFY_ICON },
  },
  {
    test: /web|website/i,
    icon: { type: "component", icon: Globe },
  },
];

const getStoreBadgeIcon = (title?: string) => {
  if (!title) return null;

  const normalized = title.trim();
  const match = STORE_BADGES.find((badge) => badge.test.test(normalized));

  return match?.icon ?? null;
};

export const StoreBadge = ({ link }: { link: AppLink }) => {
  const title = link.title?.trim() || "Web";
  const icon = getStoreBadgeIcon(title);

  const base =
    "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition hover:opacity-80";

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => event.stopPropagation()}
      className={`${base} border border-stone-200 bg-white text-stone-700 hover:bg-stone-50`}
    >
      {icon?.type === "image" ? (
        <img src={icon.src} alt={`${title} icon`} className="h-3.5 w-3 shrink-0" />
      ) : icon?.type === "component" ? (
        <icon.icon className="h-3.5 w-3 shrink-0" />
      ) : (
        <Download className="h-3.5 w-3 shrink-0" />
      )}
    </a>
  );
};

