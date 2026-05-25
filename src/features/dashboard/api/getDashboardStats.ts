import type { DashboardData } from "#shared/types/dashboardData";
import { DATA_PATHS } from "#shared/constants/dataPaths";
import { fetcher } from "#shared/lib/fetcher";

export async function getDashboardStats(): Promise<DashboardData> {
  return fetcher<DashboardData>(DATA_PATHS.dashboardStats());
}
