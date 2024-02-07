export type NewContractReqDto = {
  client: number;
  start_date: string;
  end_date: string;
  care_type: string;
  rate_per_day: null | string;
  rate_per_minute: null | string;
  rate_per_hour: null | string;
};
