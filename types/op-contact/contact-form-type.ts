export const OP_CLIENT_TYPE = [
  "main_provider", // hoofdaanbieder
  "local_authority", // Gemeente
  "particular_party", // particuliere partij
  "healthcare_institution", // Zorginstelling
] as const;
export type OpClientType = (typeof OP_CLIENT_TYPE)[number];
export type ContactType = {
  name?: string;
  email?: string;
  phone_number?: string;
};
export type OpOrgContactFormType = {
  types: OpClientType | "";
  name: string;
  address: string;
  postal_code: string;
  place: string;
  land: string;
  contacts: ContactType[];
  KVKnumber: string;
  BTWnumber: string;
  phone_number: string;
  client_number: string;
};
