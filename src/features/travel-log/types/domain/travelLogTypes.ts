import type { WorldDataEntry } from "#features/travel-log/types/domain/world";

export type TravelLogFactKind =
  | "summary"
  | "history"
  | "food"
  | "drink"
  | "activity"
  | "stay"
  | "transport"
  | "tip"
  | "weather"
  | "people"
  | "highlight"
  | "note";

export type TravelLogFact = {
  label: string;
  value: string;
  kind?: TravelLogFactKind;
};

export type TravelLogBaseEntity = {
  name: string;
  englishName?: string;
  coverImg?: string;
  data?: TravelLogFact[];
};

export type TravelLogPlace = TravelLogBaseEntity & {
  coordinates: [number, number];
  data: TravelLogFact[];
};

export type TravelLogNation = TravelLogBaseEntity & {
  data: TravelLogFact[];
  places: TravelLogPlace[];
  territories: TravelLogNation[];
};

export type TravelLogRegion = TravelLogBaseEntity & {
  data?: TravelLogFact[];
  nations: TravelLogNation[];
};

export type TravelLogMaster = {
  name: string;
  coverImg?: string;
  data?: WorldDataEntry[];
  regions: TravelLogRegion[];
};
