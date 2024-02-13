import { CertificateFormType } from "@/types/certificates/certificate-form-type";

export type NewCertifReqDto = CertificateFormType & {
  employee: number;
};
