import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "@/utils/api";
import {
  CreateLocationReqDto,
  LocationsResDto,
} from "@/types/locations/location.dto";

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

async function createLocation(data: CreateLocationReqDto) {
  const response = await api.post("/locations/", data);
  return response.data;
}

export const useCreateLocation = () => {
  const queryClient = useQueryClient();
  return useMutation(createLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(["locations"]);
    },
  });
};

async function deleteLocation(id: number) {
  const response = await api.delete(`/locations/${id}/`);
  return response.data;
}

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(["locations"]);
    },
  });
};
