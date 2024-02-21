export type AppointmentFormType = {
  title: string;
  start_time: string;
  end_time: string;
  appointment_type: "meeting";
  description: string;
  attachments: File[];
  employees: number[];
};
