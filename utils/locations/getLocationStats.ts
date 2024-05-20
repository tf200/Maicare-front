import { LocationStatsDto } from "@/types/locations/location.dto";
import api from "../api";
import { useQuery } from "react-query";

async function fetchLocationStats() {
  const res = await api.get<LocationStatsDto[]>(
    `system/dashboard/analytics/locations`
  );
  return res.data;
}

export function useLocationStats() {
  return useQuery("dashboard.analytics.location_stats", fetchLocationStats);
}
