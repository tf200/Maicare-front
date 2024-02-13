import { NewCertifReqDto } from "@/types/certificates/new-certif-req.dto";

export type CertifResDto = NewCertifReqDto & {
  id: number;
};
