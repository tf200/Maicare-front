import { NewContactReqDto } from "@/types/new-contact-req.dto";

export type ContactResDto = NewContactReqDto & { id: number };
