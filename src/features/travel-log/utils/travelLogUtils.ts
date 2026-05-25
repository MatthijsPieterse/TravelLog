import {
  buildNationRoute,
  buildPlaceRoute,
  buildRegionRoute,
} from "#shared/constants/routes";
import type {
  TravelLogBaseEntity,
  TravelLogFact,
  TravelLogMaster,
  TravelLogNation,
  TravelLogPlace,
  TravelLogRegion,
} from "#features/travel-log/types/domain/travelLogTypes";
import type {
  EntityCoverImagePathArgs,
  TravelCardItem,
  TravelCardType,
} from "#features/travel-log/types/view/travelCard";
import {
  getNationImagePath,
  getPlaceImagePath,
  getRegionImagePath,
  getTerritoryImagePath,
} from "#features/travel-log/utils/travelLogPaths";
import { displayName, slugify } from "#features/travel-log/utils/stringUtils";

type EntityWithContent = TravelLogRegion | TravelLogNation | TravelLogPlace;

type CardContext = {
  regionName: string;
  nationName?: string;
  territoryName?: string;
};

const getEntityFacts = (entity: EntityWithContent): TravelLogFact[] => {
  return entity.data ?? [];
};

const getPlaceCardImagePath = (context: CardContext, place: TravelLogPlace) => {
  if (!place.coverImg || !context.nationName) {
    return undefined;
  }

  return getPlaceImagePath(
    {
      regionName: context.regionName,
      nationName: context.nationName,
      placeName: place.name,
      parentNationName: context.territoryName,
    },
    place.coverImg,
  );
};

const getEntityCardImagePath = (
  context: CardContext,
  entity: TravelLogBaseEntity,
  type: Exclude<TravelCardType, "place">,
) => {
  if (!entity.coverImg) {
    return undefined;
  }

  if (type === "region") {
    return getRegionImagePath(context.regionName, entity.coverImg);
  }

  if (!context.nationName) {
    return undefined;
  }

  if (type === "nation") {
    return getNationImagePath({ regionName: context.regionName, nationName: context.nationName }, entity.coverImg);
  }

  if (!context.territoryName) {
    return undefined;
  }

  return getTerritoryImagePath(
    { regionName: context.regionName, nationName: context.nationName, territoryName: context.territoryName },
    entity.coverImg,
  );
};

export function hasTravelContent(entity: EntityWithContent): boolean {
  if (getEntityFacts(entity).length > 0) {
    return true;
  }

  if ("places" in entity) {
    return entity.places.some(hasTravelContent) || entity.territories.some(hasTravelContent);
  }

  if ("nations" in entity) {
    return entity.nations.some(hasTravelContent);
  }

  return false;
}

export function splitByContent<T,>(items: T[], predicate: (item: T) => boolean) {
  return {
    filled: items.filter(predicate),
    empty: items.filter((item) => !predicate(item)),
  };
}

export function getEntityCoverImagePath({
  type,
  regionName,
  entityName,
  coverImg,
  parentNationName,
}: EntityCoverImagePathArgs) {
  if (!coverImg) {
    return undefined;
  }

  if (type === "region") {
    return getRegionImagePath(regionName, coverImg);
  }

  if (type === "territory") {
    if (!parentNationName) {
      return undefined;
    }

    return getTerritoryImagePath(
      { regionName, nationName: parentNationName, territoryName: entityName },
      coverImg,
    );
  }

  return getNationImagePath({ regionName, nationName: entityName }, coverImg);
}

export function getRegionById(master: TravelLogMaster, regionId: string) {
  return master.regions.find((region) => slugify(region.name) === regionId) ?? null;
}

export function getNationById(master: TravelLogMaster, nationId: string) {
  for (const region of master.regions) {
    for (const nation of region.nations) {
      if (slugify(nation.name) === nationId) {
        return { region, nation, parentNation: null as TravelLogNation | null };
      }

      for (const territory of nation.territories) {
        if (slugify(territory.name) === nationId) {
          return { region, nation: territory, parentNation: nation };
        }
      }
    }
  }

  return null;
}

export function getPlaceById(master: TravelLogMaster, placeId: string) {
  for (const region of master.regions) {
    for (const nation of region.nations) {
      for (const place of nation.places) {
        if (slugify(place.name) === placeId) {
          return { region, nation, place, parentNation: null as TravelLogNation | null };
        }
      }

      for (const territory of nation.territories) {
        for (const place of territory.places) {
          if (slugify(place.name) === placeId) {
            return { region, nation: territory, place, parentNation: nation };
          }
        }
      }
    }
  }

  return null;
}

export function toRegionCard(region: TravelLogRegion): TravelCardItem {
  return {
    id: slugify(region.name),
    name: displayName(region.name, region.englishName),
    filled: hasTravelContent(region),
    href: buildRegionRoute(slugify(region.name)),
    imageSrc: getEntityCardImagePath({ regionName: region.name }, region, "region"),
    type: "region",
  };
}

export function toNationCard(region: TravelLogRegion, nation: TravelLogNation): TravelCardItem {
  return {
    id: slugify(nation.name),
    name: displayName(nation.name, nation.englishName),
    filled: hasTravelContent(nation),
    href: buildNationRoute(slugify(nation.name)),
    imageSrc: getEntityCardImagePath({ regionName: region.name, nationName: nation.name }, nation, "nation"),
    type: "nation",
  };
}

export function toTerritoryCard(
  region: TravelLogRegion,
  parentNation: TravelLogNation,
  territory: TravelLogNation,
): TravelCardItem {
  return {
    id: slugify(territory.name),
    name: displayName(territory.name, territory.englishName),
    filled: hasTravelContent(territory),
    href: buildNationRoute(slugify(territory.name)),
    imageSrc: getEntityCardImagePath(
      { regionName: region.name, nationName: parentNation.name, territoryName: territory.name },
      territory,
      "territory",
    ),
    type: "territory",
  };
}

export function toPlaceCard(
  region: TravelLogRegion,
  nation: TravelLogNation,
  place: TravelLogPlace,
  territoryName?: string,
): TravelCardItem {
  return {
    id: slugify(place.name),
    name: displayName(place.name, place.englishName),
    filled: hasTravelContent(place),
    href: buildPlaceRoute(slugify(place.name)),
    imageSrc: getPlaceCardImagePath({ regionName: region.name, nationName: nation.name, territoryName }, place),
    type: "place",
  };
}
