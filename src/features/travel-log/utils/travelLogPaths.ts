import { getBaseUrl } from "#shared/lib/fetcher";
import { slugify } from "#features/travel-log/utils/stringUtils";

type NationPathArgs = {
  regionName: string;
  nationName: string;
};

type PlacePathArgs = NationPathArgs & {
  placeName: string;
  parentNationName?: string;
};

export function getTravelLogWorldRootPath(): string {
  return `${getBaseUrl()}data/app/travel-log/world`;
}

export function getRegionRootPath(regionName: string): string {
  return `${getTravelLogWorldRootPath()}/${slugify(regionName)}`;
}

export function getRegionImagePath(regionName: string, fileName: string): string {
  return `${getRegionRootPath(regionName)}/images/${fileName}`;
}

export function getNationRootPath({ regionName, nationName }: NationPathArgs): string {
  return `${getRegionRootPath(regionName)}/${slugify(nationName)}`;
}

export function getNationImagePath(args: NationPathArgs, fileName: string): string {
  return `${getNationRootPath(args)}/images/${fileName}`;
}

export function getTerritoryRootPath(args: NationPathArgs & { territoryName: string }): string {
  return `${getNationRootPath(args)}/territories/${slugify(args.territoryName)}`;
}

export function getTerritoryImagePath(
  args: NationPathArgs & { territoryName: string },
  fileName: string,
): string {
  return `${getTerritoryRootPath(args)}/images/${fileName}`;
}

export function getPlaceImageRootPath({
  regionName,
  nationName,
  placeName,
  parentNationName,
}: PlacePathArgs): string {
  if (parentNationName) {
    return `${getNationRootPath({ regionName, nationName: parentNationName })}/territories/${slugify(nationName)}/places/${slugify(placeName)}/images`;
  }

  return `${getNationRootPath({ regionName, nationName })}/places/${slugify(placeName)}/images`;
}

export function getPlaceImagePath(args: PlacePathArgs, fileName: string): string {
  return `${getPlaceImageRootPath(args)}/${fileName}`;
}
