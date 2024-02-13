import { ExperienceFormType } from "@/types/experiences/experience-form-type";

export type UpdateExpDto = ExperienceFormType & {
  id: number;
  employee: number;
};
