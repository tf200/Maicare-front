import { NewEmployeesRequest } from "../employees/new-employees-request";

export type EmployeesResDto = NewEmployeesRequest & {
  user: number;
};
