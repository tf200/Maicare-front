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
