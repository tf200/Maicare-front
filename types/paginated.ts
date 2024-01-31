type Paginated<DataT> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: DataT[];
};
