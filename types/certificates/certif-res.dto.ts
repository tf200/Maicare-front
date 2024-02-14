import { NewCertifReqDto } from "./new-certif-req.dto";

export type CertifResDto = NewCertifReqDto & {
  id: number;
};
