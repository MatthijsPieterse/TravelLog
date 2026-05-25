export type TravelCardType = "region" | "nation" | "place" | "territory";

export type TravelCardItem = {
  id: string;
  name: string;
  subtitle?: string;
  href?: string;
  filled: boolean;
  type: TravelCardType;
  imageSrc?: string;
};

export type EntityCoverImagePathArgs = {
  type: "region" | "nation" | "territory";
  regionName: string;
  entityName: string;
  coverImg?: string;
  parentNationName?: string;
};
