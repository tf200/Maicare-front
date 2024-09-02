import { DepartureEntries } from "@/types/departure_entries";
import { AddressType } from "./client-form-type";

export type NewClientsRequest = {
  first_name: string;
  last_name: string;
  email: string;
  organisation: string;
  location: number;
  legal_measure: string;
  addresses: AddressType[];
  birthplace: string;
  departement: string;
  gender: string;
  filenumber: number;
  phone_number: string;
  bsn: string;
  source: string;
  date_of_birth: string;
  city: string;
  Zipcode: string;
  infix: string;
  streetname: string;
  street_number: string;
  identity_attachment_ids: string[];
  departure_reason?: string;
  departure_report?: string;
};
