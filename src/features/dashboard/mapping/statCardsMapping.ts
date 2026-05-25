import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Flag,
  Building2,
  Map,
  ArrowUp,
  ArrowDown,
  Mountain,
  Flame,
  Snowflake,
  Route,
  Clock,
  Building,
  PlaneTakeoff,
  Plane,
  Car,
  Languages,
  Utensils,
  Banknote,
  Landmark,
  Timer,
  Heart,
} from "lucide-react";
import type { DashboardData } from "#shared/types/dashboardData";

export interface StatCard<DataType = DashboardData> {
  color: string;
  darkTheme?: boolean;
  icon?: LucideIcon;
  title?: string;
  subtext?: string | ((data: DataType) => string | number);
  getValue: (data: DataType) => string | number;
  unit?: string;
}

// main stats
export const mainStatsMapping: StatCard[] = [
  {
    color: "emerald",
    darkTheme: true,
    icon: Flag,
    subtext: "Nations Visited",
    getValue: (data) => data.globalStats.totalNations,
  },
  {
    color: "emerald",
    darkTheme: true,
    icon: Building2,
    subtext: "Places Visited",
    getValue: (data) => data.globalStats.totalPlaces,
  },
  {
    color: "emerald",
    darkTheme: true,
    icon: Map,
    subtext: "Regions Visited",
    getValue: (data) => data.globalStats.totalRegions,
  },
  {
    color: "emerald",
    darkTheme: true,
    icon: Globe,
    subtext: "Of the world explored",
    getValue: (data) => `${data.tileStats.grid1.percentage.toFixed(2)}%`,
  },
];

// geo stats
export const geoStatsMapping: StatCard[] = [
  {
    color: "green",
    title: "Northernmost",
    icon: ArrowUp,
    getValue: (data) => data.geoStats.northernmost.name,
    subtext: (data) => `Lon: ${data.geoStats.northernmost.coordinates[1].toFixed(2)})`,
  },
  {
    color: "green",
    title: "Southernmost",
    icon: ArrowDown,
    getValue: (data) => data.geoStats.southernmost.name,
    subtext: (data) => `Lon: ${data.geoStats.southernmost.coordinates[1].toFixed(2)})`,
  },
  {
    color: "teal",
    title: "Highest Point",
    icon: Mountain,
    getValue: (data) =>
      `${data.geoStats.highestpoint.name}`,
    subtext: (data) => `${data.geoStats.highestpoint.height}`,
  },
  {
    color: "emerald",
    title: "Lowest Point",
    icon: Map,
    getValue: (data) =>
      `${data.geoStats.lowestpoint.name}`,
    subtext: (data) => `${data.geoStats.lowestpoint.height}`,
  },
  {
    color: "red",
    title: "Hottest Place",
    icon: Flame,
    getValue: (data) =>
      `${data.geoStats.hottestTemperature.place}`,
    subtext: (data) => `${data.geoStats.hottestTemperature.temperature}`,
  },
  {
    color: "cyan",
    title: "Coldest Place",
    icon: Snowflake,
    getValue: (data) =>
      `${data.geoStats.coldestTemperature.place}`,
    subtext: (data) => `${data.geoStats.coldestTemperature.temperature}`,
  },
];

// flight stats
export const flightMapping: StatCard[] = [
  {
    color: "blue",
    title: "Time in Air",
    icon: Clock,
    getValue: (data) => data.transportation.timeInAir,
  },
  {
    color: "blue",
    title: "Airports Visited",
    icon: Building,
    getValue: (data) => data.transportation.airportsBeen,
  },
  {
    color: "sky",
    title: "Airlines Flown",
    icon: PlaneTakeoff,
    getValue: (data) => data.transportation.airlinesFlown,
  },
  {
    color: "sky",
    title: "Flights Taken",
    icon: Plane,
    getValue: (data) => data.transportation.flightsTaken,
  },
];

// transportation stats
export const transportationMapping: StatCard[] = [
  {
    color: "orange",
    title: "Total Distance Traveled",
    icon: Car,
    getValue: (data) => data.transportation.distanceTraveled.total,
    unit: "km",
  },
  ...["plane", "train", "bus", "boat", "car", "bike"].map((mode) => ({
    color: "amber",
    title: `${mode.charAt(0).toUpperCase() + mode.slice(1)} Distance`,
    icon: Route,
    getValue: (data: DashboardData) =>
      data.transportation.distanceTraveled[mode],
    unit: "km",
  })),
];

// cultural stats
export const culturalMapping: StatCard[] = [
  {
    color: "indigo",
    title: "Languages Heard",
    icon: Languages,
    getValue: (data) => data.cultural.languagesHeard.allDetailed,
  },
  {
    color: "rose",
    title: "Cuisines Tried",
    icon: Utensils,
    getValue: (data) => data.cultural.cuisinesTried,
  },
  {
    color: "emerald",
    title: "Currencies Used",
    icon: Banknote,
    getValue: (data) => data.cultural.currenciesUsed,
  },
  {
    color: "violet",
    title: "Time Zones Visited",
    icon: Clock,
    getValue: (data) =>
      `${data.cultural.timeZones.visited} / ${data.cultural.timeZones.total}`,
  },
  {
    color: "amber",
    title: "UNESCO Sites",
    icon: Landmark,
    getValue: (data) => data.cultural.UNESCO,
  },
];

// trip records
export const tripRecordsMapping: StatCard[] = [
  {
    color: "teal",
    title: "Longest Trip",
    icon: Timer,
    getValue: (data) => data.tripRecords.longestTrip,
    unit: "days",
  },
  {
    color: "teal",
    title: "Shortest Trip",
    icon: Clock,
    getValue: (data) => data.tripRecords.shortestTrip,
    unit: "day",
  },
];

// personal favorites
export const personalFavoritesMapping: StatCard[] = [
  {
    color: "rose",
    title: "Favorite Nations",
    icon: Heart,
    getValue: (data) =>
      data.personal.favouriteTravelDestinations.overall.nations.join(", "),
  },
  {
    color: "yellow",
    title: "Favorite Places",
    icon: Building2,
    getValue: (data) =>
      data.personal.favouriteTravelDestinations.overall.places.join(", "),
  },
];
