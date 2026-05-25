import fs from "fs";
import * as turf from "@turf/turf";
import type { Feature, Polygon } from "geojson";
import type { Coordinates } from "../types.ts";
import { encodeTile } from "../utils/tileUtils.ts";
import {
  writeJSON,
  joinPath,
  DIR_TILES,
  NATIONSPOLYGONS_FILE,
} from "../utils/fileUtils.ts";

const GRID_SIZES = [1, 0.5];

const getTileXY = (coord: Coordinates, gridSize: number) => {
  const [lon, lat] = coord;
  const x = Math.floor((lon + 180) / gridSize);
  const y = Math.floor((lat + 90) / gridSize);
  return [x, y];
};

// Load nations
const nations = JSON.parse(fs.readFileSync(NATIONSPOLYGONS_FILE, "utf8"));

// Generate land tiles for a grid size
const generateLandTiles = (gridSize: number) => {
  console.log(`\nGenerating land tiles for grid size ${gridSize}°...`);
  const startTime = Date.now();

  const landTiles = new Set<number>();

  nations.features.forEach((feature: any, i: number) => {
    if (i % 10 === 0)
      console.log(`Processing feature ${i + 1}/${nations.features.length}`);

    if (!["Polygon", "MultiPolygon"].includes(feature.geometry.type)) return;

    const polygon = turf.feature(feature.geometry);
    const bbox = turf.bbox(polygon);
    const [minLon, minLat, maxLon, maxLat] = bbox;

    // Step 1: generate a grid for the bounding box
    const grid = turf.squareGrid([minLon, minLat, maxLon, maxLat], gridSize, {
      units: "degrees",
    });

    // Step 2: batch filter tiles that intersect the polygon
    const intersectingTiles: Feature<Polygon>[] = [];

    grid.features.forEach((tile) => {
      // If tile is fully inside or intersects polygon, keep it
      if (
        turf.booleanContains(polygon, tile) ||
        turf.booleanIntersects(tile, polygon)
      ) {
        intersectingTiles.push(tile);
      }
    });

    // Step 3: convert filtered tiles to numeric keys
    intersectingTiles.forEach((tile) => {
      const [lon, lat] = tile.geometry.coordinates[0][0]; // bottom-left corner
      const [x, y] = getTileXY([lon, lat], gridSize);
      landTiles.add(encodeTile(x, y));
    });
  });

  const filePath = joinPath(DIR_TILES, `landTiles_${gridSize}.json`);
  writeJSON(filePath, Array.from(landTiles));

  console.log(
    `Finished grid ${gridSize}°: ${landTiles.size} tiles generated in ${(
      (Date.now() - startTime) /
      1000
    ).toFixed(2)}s`,
  );
};

// Generate tiles for all grid sizes
const totalStart = Date.now();
GRID_SIZES.forEach((gridSize) => generateLandTiles(gridSize));
console.log(
  `\nAll grids done in ${((Date.now() - totalStart) / 1000).toFixed(2)}s`,
);
