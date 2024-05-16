export type EmployeesSearchParams = Partial<{
  search: string;
  groups?: string;
  out_of_service: boolean;
  location?: number;
  is_archived?: boolean;
}>;
