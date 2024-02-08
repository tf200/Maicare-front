import { NewFeedbackReqDto } from "./new-feedback-req-dto";

export type FeedbackListItem = NewFeedbackReqDto;

export type FeedbackListResDto = Paginated<FeedbackListItem>;
