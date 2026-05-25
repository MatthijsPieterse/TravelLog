import L from "leaflet";
import type { Icon } from "leaflet";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Original height to width ratio of the marker icon (size: 25x41) and marker shadow (size: 41x41)
const ICON_RATIO = 41 / 25;
const SHADOW_RATIO = 41 / 41;
const iconCache: Record<number, Icon> = {};

export const createIcon = (size: number): Icon => {
  if (iconCache[size]) return iconCache[size];

  const iconHeight = Math.round(size * ICON_RATIO);
  const shadowSize = Math.round(iconHeight * SHADOW_RATIO);

  const icon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [size, iconHeight],
    iconAnchor: [Math.round(size / 2), iconHeight],
    popupAnchor: [0, -iconHeight],
    shadowSize: [shadowSize, shadowSize],
    shadowAnchor: [Math.round(size / 2), shadowSize],
  }) as unknown as Icon;

  iconCache[size] = icon;
  return icon;
};
