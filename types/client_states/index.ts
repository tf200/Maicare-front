export type ClientStateFormType = {
  type: string;
  created: string;
  value: number;
  content: string;
};

export type ClientStateResDto = {
  id: number;
  client_id: number;
  type: string;
  created: string;
  value: number;
  content: string;
};

export type ClientStateReqDto = {
  client_id: number;
  type: string;
  value: number;
  content: string;
};

export type ClientStateListResDto = Paginated<ClientStateResDto>;

export type UpdateClientStateReqDto = Partial<Omit<ClientStateResDto, "client_id">>;
