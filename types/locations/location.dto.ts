export type LocationItem = {
  id: number;
  name: string;
  address: string;
};

export type LocationsResDto = Paginated<LocationItem>;

export type CreateLocationReqDto = {
  name: string;
  address: string;
};

export type LocationResDto = LocationItem;
