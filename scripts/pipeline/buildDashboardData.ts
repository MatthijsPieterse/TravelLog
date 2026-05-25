import { getVisitedTileStats } from "./stats/visitedTileStats.ts";
import { getGeoStats } from "./stats/geoStats.ts";
import { getGlobalStats } from "./stats/globalStats.ts";
import { generateTileOverlay } from "../overlays/generateTileOverlay.ts";
import type { VisitedGeoJSON } from "../types.ts";
import type { DashboardData } from "../../src/shared/types/dashboardData.ts";

interface DashboardDataParams {
  visitedNations: VisitedGeoJSON;
  visitedPlaces: VisitedGeoJSON;
  landTiles1: number[];
  landTiles05: number[];
}

export const buildDashboardData = (
  params: DashboardDataParams,
): DashboardData => {
  const { visitedNations, visitedPlaces, landTiles1, landTiles05 } = params;

  // Global Stats
  const globalStats = getGlobalStats(visitedNations, visitedPlaces);

  // Tile Stats
  const grid1Stats = getVisitedTileStats(visitedPlaces, landTiles1, 1);
  const grid05Stats = getVisitedTileStats(visitedPlaces, landTiles05, 0.5);

  // Geo Stats
  const geoStats = getGeoStats(visitedPlaces);

  // Generate Tile Overlays
  generateTileOverlay(grid1Stats.visitedTileKeys, landTiles1, 1);
  generateTileOverlay(grid05Stats.visitedTileKeys, landTiles05, 0.5);

  // Compile Dashboard Stats
  return {
    globalStats: {
      totalNations: globalStats.totalNations,
      totalPlaces: globalStats.totalPlaces,
      totalRegions: globalStats.totalRegions,
    },
    tileStats: {
      grid1: {
        visited: grid1Stats.visitedTilesCount,
        total: grid1Stats.totalTilesCount,
        percentage: grid1Stats.percentage,
      },
      grid05: {
        visited: grid05Stats.visitedTilesCount,
        total: grid05Stats.totalTilesCount,
        percentage: grid05Stats.percentage,
      },
    },
    geoStats: {
      northernmost: {
        name: geoStats.northernmost.properties.name,
        coordinates: geoStats.northernmost.geometry.coordinates,
      },
      southernmost: {
        name: geoStats.southernmost.properties.name,
        coordinates: geoStats.southernmost.geometry.coordinates,
      },
      highestpoint: {
        name: "Lang Biang Mountain",
        coordinates: [108.440616, 12.047309],
        height: "2167m",
      },
      lowestpoint: {
        name: "Schiphol Airport",
        coordinates: [4.763889, 52.310556],
        height: "-4,5m",
      },
      hottestTemperature: {
        place: "Monaco, Monaco",
        temperature: "42°C",
      },
      coldestTemperature: {
        place: "Inari, Finland",
        temperature: "-30°C",
      },
    },
    transportation: {
      flightsTaken: 13,
      airportsBeen: 11,
      airlinesFlown: 9,
      timeInAir: "57h 13m",
      distanceTraveled: {
        plane: "37.300",
        train: "10.364",
        bus: "5.351",
        boat: "914,6",
        car: "157,4",
        bike: "75,1",
        total: "54.162",
      },
      longest: {
        Flight: {
          from: "Ho Chi Minh City (SGN)",
          to: "Frankfurt (FRA)",
          distance: "10,500 km",
          time: "12h 5m",
        },
        Train: {
          from: "Tampere",
          to: "Rovaniemi",
          distance: "563.9 km",
          time: "8h 2m",
        },
        Bus: {
          from: "Copenhagen",
          to: "Arnhem",
          distance: "726 km",
          time: "10h 16m",
        },
        Boat: {
          from: "Turku",
          to: "Stockholm",
          distance: "275 km",
          time: "9h 35m",
        },
        Car: {
          from: "Blerick",
          to: "Venlo",
          distance: "76 km",
          time: "57m",
        },
        Bike: {
          from: "Valkenburg",
          to: "Vaals",
          distance: "25.4 km",
          time: "1h 30m",
        },
      },
    },
    cultural: {
      languagesHeard: {
        inPlaceSimple: 21, // Could be calculated based on nations/ regions info json, but for now hardcoded
        inPlaceDetailed: 23, // Could be calculated based on nations/ regions info json, but for now hardcoded
        allSimple: 36,
        allDetailed: 43,
      },
      cuisinesTried: 33,
      currenciesUsed: 10, // Could be calculated based on nations info json, but for now hardcoded
      UNESCO: "N/A",
      timeZones: {
        visited: 4, // Could be calculated based on visited places, but for now hardcoded
        total: 38,
      },
    },
    tripRecords: {
      longestTrip: 23, // Longest trip in days (might remove)
      shortestTrip: 1, // Shortest trip in days (might remove)
    },
    personal: {
      favouriteTravelDestinations: {
        overall: {
          nations: ["Philippines", "Vietnam", "Andorra", "Italy", "Spain"],
          places: [
            "Budapest",
            "Andorra la Vella",
            "Prague",
            "Vilnius",
            "Valencia",
          ],
        },
        byRegion: {
          Europe: {
            nations: ["Andorra", "Italy", "Spain", "Hungary", "Switzerland"],
            places: [
              "Budapest",
              "Andorra la Vella",
              "Prague",
              "Vilnius",
              "Valencia",
            ],
          },
          Asia: {
            nations: ["Philippines", "Vietnam"],
            places: ["Da Lat", "Ho Chi Minh City"],
          },
        },
        netherlands: {
          places: ["Valkenburg", "Utrecht", "Zutphen"],
        },
      },
    },
  };
};
