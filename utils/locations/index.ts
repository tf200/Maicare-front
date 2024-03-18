import { useQuery } from "react-query";
import api from "@/utils/api";
import { LocationsResDto } from "@/types/locations/location.dto";

async function getLocations() {
  const response = await api.get<LocationsResDto>("/locations/");
  return response.data;
}

export const useLocations = () => {
  const query = useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  });

  return query;
};
