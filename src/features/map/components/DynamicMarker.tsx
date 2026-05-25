import { type ReactNode } from "react";
import { Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { createIcon } from "#features/map/components/CreateIcon";

interface Props {
  position: LatLngExpression;
  zoom: number;
  children?: ReactNode;
}

const getSize = (zoom: number) => {
  return zoom < 5 ? 10 : zoom < 8 ? 15 : zoom < 12 ? 20 : 30;
};

export const DynamicMarker = ({ position, zoom, children }: Props) => {
  const size = getSize(zoom);
  const icon = createIcon(size);

  return (
    <Marker position={position} icon={icon}>
      {children ? <Popup>{children}</Popup> : null}
    </Marker>
  );
};
