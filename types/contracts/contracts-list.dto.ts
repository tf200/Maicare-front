import { ContractResDto } from "@/types/contracts/contract-res.dto";

export type ContractItem = Pick<
  ContractResDto,
  | "id"
  | "start_date"
  | "end_date"
  | "care_type"
  | "client_id"
  | "price_frequency"
  | "price"
  | "status"
> & {
  client_first_name: string;
  client_last_name: string;
  client_email: string;
};

export type ContractsListDto = Paginated<ContractItem>;
