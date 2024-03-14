import { EmployeeResDto } from "@/types/employees/employee-res.dto";

export type UpdateProfilePictureDto = Pick<EmployeeResDto, "profile_picture">;
