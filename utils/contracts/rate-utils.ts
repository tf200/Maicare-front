import { ContractResDto } from "@/types/contracts/contract-res.dto";
import dayjs, { OpUnitType, QUnitType } from "dayjs";
import { RateType } from "@/types/rate-type";
import { formatPrice } from "@/utils/priceFormatting";

const rateDict: Record<RateType, string> = {
  day: "Dagelijks",
  hour: "Per uur",
  minute: "Per minuut",
  week: "Per week",
};

export function getRate(item: ContractResDto) {
  const rate = item.rate_value;

  return rate ? formatPrice(rate) : "No rate set";
}

export function rateType(item: ContractResDto) {
  return rateDict[item.rate_type];
}

export function getRateUnit(item: ContractResDto): QUnitType | OpUnitType {
  return item.rate_type;
}

export const tarifDict: Record<RateType, string> = {
  day: "Tarief per dag",
  hour: "Tarief per uur",
  minute: "Tarief per minuut",
  week: "Tarief per week",
};

export function rateString(item: ContractResDto) {
  return tarifDict[item.rate_type];
}

export function calculateTotalRate(item: ContractResDto) {
  const from = dayjs(item.start_date);
  const to = dayjs(item.end_date);
  const duration = to.diff(from, getRateUnit(item));
  return item.rate_value
    ? formatPrice(item.rate_value * duration)
    : "No rate set";
}
