import fs from "fs";
import { Worker, isMainThread, parentPort, workerData } from "worker_threads";
import os from "os";
import type { Feature } from "geojson";
import * as martinez from "martinez-polygon-clipping";
import type { Coordinates } from "../types.ts";
import { encodeTile } from "../utils/tileUtils.ts";
import {
  writeJSON,
  joinPath,
  DIR_TILES,
  NATIONSPOLYGONS_FILE,
} from "../utils/fileUtils.ts";

const GRID_SIZES = [1];

const getTileXY = (coord: Coordinates, gridSize: number) => {
  const [lon, lat] = coord;
  const x = Math.floor((lon + 180) / gridSize);
  const y = Math.floor((lat + 90) / gridSize);
  return [x, y];
};

if (isMainThread) {
  const nations = JSON.parse(fs.readFileSync(NATIONSPOLYGONS_FILE, "utf8"));
  const numWorkers = Math.max(1, os.cpus().length - 1);

  GRID_SIZES.forEach((gridSize) => {
    console.log(
      `\nGenerating land tiles for grid size ${gridSize}° with ${numWorkers} workers...`,
    );
    const startTime = Date.now();
    const chunkSize = Math.ceil(nations.features.length / numWorkers);
    const workers: Worker[] = [];
    const results: Set<number> = new Set();

    for (let i = 0; i < numWorkers; i++) {
      const chunk = nations.features.slice(
        i * chunkSize,
        (i + 1) * chunkSize,
      );
      const worker = new Worker(new URL(import.meta.url), {
        workerData: { chunk, gridSize, workerIndex: i },
      });

      worker.on("message", (msg: any) => {
        if (msg.type === "progress") {
          console.log(
            `[Worker ${msg.workerIndex}] Processing feature ${msg.featureIndex + 1}/${msg.totalFeatures}`,
          );
        } else if (msg.type === "tiles") {
          msg.tiles.forEach((t: number) => results.add(t));
        }
      });

      worker.on("error", (err) => console.error(err));
      workers.push(worker);
    }

    Promise.all(
      workers.map((w) => new Promise((res) => w.on("exit", res))),
    ).then(() => {
      const filePath = joinPath(DIR_TILES, `landTiles_${gridSize}.json`);
      writeJSON(filePath, Array.from(results));
      console.log(
        `Finished grid ${gridSize}°: ${results.size} tiles generated in ${(
          (Date.now() - startTime) /
          1000
        ).toFixed(2)}s`,
      );
    });
  });
} else {
  // Worker thread
  const { chunk, gridSize, workerIndex } = workerData as {
    chunk: Feature[];
    gridSize: number;
    workerIndex: number;
  };
  const workerTiles: Set<number> = new Set();

  chunk.forEach((feature, featureIndex) => {
    parentPort?.postMessage({
      type: "progress",
      workerIndex,
      featureIndex,
      totalFeatures: chunk.length,
    });

    const geom = feature.geometry;
    if (!geom) return;

    let polygons: number[][][][] = [];
    if (geom.type === "Polygon") {
      polygons = [geom.coordinates as number[][][]];
    } else if (geom.type === "MultiPolygon") {
      polygons = geom.coordinates as number[][][][];
    } else {
      return;
    }

    const flatPolygons = polygons.map((poly) =>
      poly.map((ring) => ring.map(([lon, lat]) => [lon, lat])),
    );

    let minLon = Infinity,
      minLat = Infinity,
      maxLon = -Infinity,
      maxLat = -Infinity;
    flatPolygons.forEach((poly) =>
      poly.forEach((ring) =>
        ring.forEach(([lon, lat]) => {
          minLon = Math.min(minLon, lon);
          maxLon = Math.max(maxLon, lon);
          minLat = Math.min(minLat, lat);
          maxLat = Math.max(maxLat, lat);
        }),
      ),
    );

    const [minX, minY] = getTileXY([minLon, minLat], gridSize);
    const [maxX, maxY] = getTileXY([maxLon, maxLat], gridSize);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        const tilePolygon = [
          [
            [x * gridSize - 180, y * gridSize - 90],
            [x * gridSize - 180 + gridSize, y * gridSize - 90],
            [x * gridSize - 180 + gridSize, y * gridSize - 90 + gridSize],
            [x * gridSize - 180, y * gridSize - 90 + gridSize],
            [x * gridSize - 180, y * gridSize - 90],
          ],
        ];

        const intersects = flatPolygons.some(
          (poly) =>
            (martinez.intersection(poly as any, tilePolygon as any)?.length ??
              0) > 0,
        );

        if (intersects) workerTiles.add(encodeTile(x, y));
      }
    }
  });

  parentPort?.postMessage({ type: "tiles", tiles: Array.from(workerTiles) });
}
