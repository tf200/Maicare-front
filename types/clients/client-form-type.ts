export type ClientFormType = {
  first_name: string;
  last_name: string;
  email: string;
  organisation: string;
  location: string;
  legal_measure: string;
  birthplace: string;
  departement: string;
  gender: string;
  filenumber: string;
  phone_number: string;
  bsn: string;
  source: string;
  date_of_birth: string;
  city: string;
  Zipcode: string;
  addresses: AddressType[];
  infix: string;
  streetname: string;
  street_number: string;
  added_identity_documents?: string[];
  removed_identity_documents?: string[];
  departure_reason?: string;
  departure_report?: string;
};

export type AddressType = {
  belongs_to: string;
  address: string;
  city: string;
  zip_code: string;
}