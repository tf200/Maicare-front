import { NewObservationsReqDto } from "../observations/new-observations-req-dto";

export type ObservationtItem = NewObservationsReqDto;
export type ObservationsListResDto = Paginated<NewObservationsReqDto>;
