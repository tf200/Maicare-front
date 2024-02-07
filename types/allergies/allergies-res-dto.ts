import { NewAllergyReqDto } from "@/types/allergies/new-allergy-req-dto";

export type AllergiesResDto = {
  id: number;
} & NewAllergyReqDto;
