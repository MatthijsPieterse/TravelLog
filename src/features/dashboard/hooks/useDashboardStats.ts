import { useQuery } from "@tanstack/react-query";
import type { DashboardData } from "#shared/types/dashboardData";
import { getDashboardStats } from "#features/dashboard/api/getDashboardStats";
import { QUERY_KEYS } from "#shared/constants/queryKeys";

export function useDashboardStats() {
  return useQuery<DashboardData>({
    queryKey: QUERY_KEYS.dashboardStats,
    queryFn: getDashboardStats,
  });
}
