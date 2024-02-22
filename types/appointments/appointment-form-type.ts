import { EmployeeResDto } from "@/types/employees/employee-res.dto";
import { ClientsResDto } from "@/types/clients/clients-res-dto";

export type AppointmentFormType = {
  title: string;
  start_time: string;
  end_time: string;
  appointment_type: "meeting";
  description: string;
  attachments: File[];
  employees: number[];
  clients: number[];
};
