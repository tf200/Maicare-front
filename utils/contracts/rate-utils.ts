import { ContractResDto } from "@/types/contracts/contract-res.dto";

export function getRate(item: ContractResDto) {
  const rate = item.rate_per_day || item.rate_per_hour || item.rate_per_minute;

  return rate ? rate + " €" : "No rate set";
}

export function rateType(item: ContractResDto) {
  return item.rate_per_day
    ? "Daily"
    : item.rate_per_hour
      ? "Hourly"
      : "Per minute";
}

export function rateString(item: ContractResDto) {
  return item.rate_per_day
    ? "Rate per day"
    : item.rate_per_hour
      ? "Rate per hour"
      : "Rate per minute";
}
