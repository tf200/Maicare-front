import { NewEmployeeReqDto } from "@/types/employees/new-employee-req.dto";

export type EmployeeResDto = NewEmployeeReqDto & {
  id: number;
};
