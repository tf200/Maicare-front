import { CertificateFormType } from "@/types/certificates/certificate-form-type";

export type UpdateCertifDto = CertificateFormType & {
  id: number;
  employee: number;
};
