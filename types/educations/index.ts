import { NewBgInfoReqDto } from "@/types/employee-background/new-bg-info-req.dto";
import { BgInfoResDto } from "@/types/employee-background/bg-info-res.dto";
import { BgInfoListDto } from "@/types/employee-background/bg-info-list.dto";
import { UpdateBgInfoDto } from "@/types/employee-background/update-bg-info.dto";

export type EducationFormType = {
  institution_name: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
};

export type NewEducationReqDto = NewBgInfoReqDto<EducationFormType>;
export type EducationResDto = BgInfoResDto<EducationFormType>;
export type EducationListDto = BgInfoListDto<EducationFormType>;
export type UpdateEducationReqDto = UpdateBgInfoDto<EducationFormType>;
