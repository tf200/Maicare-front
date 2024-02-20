import { ContractResDto } from "@/types/contracts/contract-res.dto";
import dayjs, { QUnitType } from "dayjs";
import { RateType } from "@/types/rate-type";
import { formatPrice } from "@/utils/priceFormatting";

export function getRate(item: ContractResDto) {
  const rate = item.rate_per_day || item.rate_per_hour || item.rate_per_minute;

  return rate ? formatPrice(parseFloat(rate)) : "No rate set";
}

export function rateType(item: ContractResDto) {
  return item.rate_per_day
    ? "Daily"
    : item.rate_per_hour
      ? "Hourly"
      : "Per minute";
}

export function getRateUnit(item: ContractResDto): QUnitType {
  return item.rate_per_day ? "day" : item.rate_per_hour ? "hour" : "minute";
}

export function rateString(item: ContractResDto) {
  return item.rate_per_day
    ? "Tarief per dag"
    : item.rate_per_hour
      ? "Tarief per uur"
      : "Tarief per minuut";
}

export function calculateTotalRate(item: ContractResDto) {
  const from = dayjs(item.start_date);
  const to = dayjs(item.end_date);
  const duration = to.diff(from, getRateUnit(item));
  const rate = item.rate_per_day || item.rate_per_hour || item.rate_per_minute;
  return rate ? formatPrice(parseFloat(rate) * duration) : "No rate set";
}
