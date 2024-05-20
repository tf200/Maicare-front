export type LocationItem = {
  id: number;
  name: string;
  address: string;
  capacity: number;
};

export type LocationsResDto = Paginated<LocationItem>;

export type CreateLocationReqDto = {
  name: string;
  address: string;
  capacity: number;
};

export type LocationResDto = LocationItem;

export type UpdateLocationReqDto = Partial<CreateLocationReqDto>;

export type LocationStatsDto = {
  location_name: string;
  location_id: number;
  location_capacity: number;
  total_employees: number;
  total_clients: number;
  total_expenses: number;
  total_revenue: number;
};
