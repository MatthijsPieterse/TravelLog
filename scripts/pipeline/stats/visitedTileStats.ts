import type { Coordinates, VisitedGeoJSON } from "../../types.ts";

const encodeTile = (x: number, y: number) => (x << 16) | y;

const getTileXY = (coord: Coordinates, gridSize: number) => {
  const [lon, lat] = coord;
  const x = Math.floor((lon + 180) / gridSize);
  const y = Math.floor((lat + 90) / gridSize);
  return [x, y];
};

const getTileKey = (coord: Coordinates, gridSize: number) => {
  const [x, y] = getTileXY(coord, gridSize);
  return encodeTile(x, y);
};

export const getVisitedTileStats = (
  visitedData: VisitedGeoJSON,
  landTilesArray: number[],
  gridSize: number,
) => {
  const landTiles = new Set<number>(landTilesArray);
  const visitedTiles = new Set<number>();

  visitedData.features.forEach((feature: any) => {
    const coords = feature.geometry.coordinates;
    const tileKey = getTileKey(coords, gridSize);

    if (landTiles.has(tileKey)) {
      visitedTiles.add(tileKey);
    }
  });

  return {
    gridSize,
    visitedTilesCount: visitedTiles.size,
    totalTilesCount: landTiles.size,
    percentage: (visitedTiles.size / landTiles.size) * 100,
    visitedTileKeys: Array.from(visitedTiles),
  };
};
