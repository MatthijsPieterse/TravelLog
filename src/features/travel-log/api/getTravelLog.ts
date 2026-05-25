import { DATA_PATHS } from "#shared/constants/dataPaths";
import { fetcher } from "#shared/lib/fetcher";

import type { TravelLogMaster } from "#features/travel-log/types/domain/travelLogTypes";

export const fetchTravelLog = async (): Promise<TravelLogMaster> => {
  return fetcher<TravelLogMaster>(DATA_PATHS.travelLogMaster());
};

