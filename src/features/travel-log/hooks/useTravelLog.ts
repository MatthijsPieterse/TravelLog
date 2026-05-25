import { useQuery } from "@tanstack/react-query";

import { fetchTravelLog } from "#features/travel-log/api/getTravelLog";
import { QUERY_KEYS } from "#shared/constants/queryKeys";

export const useTravelLog = () => {
  return useQuery({
    queryKey: QUERY_KEYS.travelLogMaster,
    queryFn: fetchTravelLog,
    staleTime: Infinity,
  });
};

