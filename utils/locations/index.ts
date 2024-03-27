import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "@/utils/api";
import {
  CreateLocationReqDto,
  LocationsResDto,
  UpdateLocationReqDto,
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
  const response = await api.delete(`/locations/RUD/${id}/`);
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

async function updateLocation(data: UpdateLocationReqDto, id: number) {
  const response = await api.put(`/locations/RUD/${id}/`, data);
  return response.data;
}

export const useUpdateLocation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateLocationReqDto) => updateLocation(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["locations"]);
    },
  });
};

async function getLocation(id: number) {
  const response = await api.get(`/locations/RUD/${id}/`);
  return response.data;
}

export const useLocation = (id: number) => {
  return useQuery({
    queryKey: ["locations", id],
    queryFn: () => getLocation(id),
  });
};
