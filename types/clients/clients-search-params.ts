export type ClientsSearchParams = Partial<{
  search: string;
  status__in: string;
  location?: number;
}>;
