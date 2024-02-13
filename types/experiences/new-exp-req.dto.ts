import { ExperienceFormType } from "@/types/experiences/experience-form-type";

export type NewExpReqDto = ExperienceFormType & {
  employee: number;
};
