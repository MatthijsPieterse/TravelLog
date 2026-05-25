import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import type { FeatureCollection, GeoJsonObject, Point } from "geojson";
import type { LatLngExpression } from "leaflet";
import { useState } from "react";
import { DynamicMarker } from "#features/map/components/DynamicMarker";
import Spinner from "#shared/components/ui/Spinner";

import { useMapData } from "#features/map/api/useMapData";
import { ZoomTracker } from "#features/map/components/ZoomTracker";
import { nationStyle, tileStyle } from "#features/map/utils/mapUtils";

interface MapProps {
  defaultCenter: LatLngExpression;
  defaultZoom: number;
}

type VisitedPlaceProperties = {
  name?: string;
};

const isPointFeatureCollection = (
  value: GeoJsonObject,
): value is FeatureCollection<Point, VisitedPlaceProperties> => {
  return value.type === "FeatureCollection";
};

const MapComponent = ({ defaultCenter, defaultZoom }: MapProps) => {
  const { data, isLoading, error } = useMapData();
  const [zoom, setZoom] = useState(defaultZoom);

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Error loading map data: {error.message}
      </div>
    );
  if (!data) return <Spinner />;

  const { nations, visitedNames, visitedPlaces, landTiles1, landTiles05 } =
    data;

  const placeFeatures = isPointFeatureCollection(visitedPlaces)
    ? visitedPlaces.features
    : [];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      className="h-full w-full z-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <ZoomTracker setZoom={setZoom} />

      <LayersControl position="topright">
        <LayersControl.Overlay checked name="Visited Nations">
          <LayerGroup>
            {nations && (
              <GeoJSON data={nations} style={nationStyle(visitedNames)} />
            )}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Visited Places">
          <LayerGroup>
            {placeFeatures.map((place, index) => {
              const coordinates = place.geometry?.coordinates;
              const name = place.properties?.name;

              if (!coordinates || !name) {
                return null;
              }

              return (
                <DynamicMarker
                  key={`${name}-${index}`}
                  position={[coordinates[1], coordinates[0]]}
                  zoom={zoom}
                >
                  {name}
                </DynamicMarker>
              );
            })}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Tile Overlay (1 deg)">
          <LayerGroup>
            {landTiles1 && <GeoJSON data={landTiles1} style={tileStyle} />}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Tile Overlay (0.5 deg)">
          <LayerGroup>
            {landTiles05 && <GeoJSON data={landTiles05} style={tileStyle} />}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default MapComponent;
