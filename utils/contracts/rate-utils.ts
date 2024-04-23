import { ContractResDto } from "@/types/contracts/contract-res.dto";
import dayjs, { OpUnitType, QUnitType } from "dayjs";
import { RateType } from "@/types/rate-type";
import { formatPrice } from "@/utils/priceFormatting";
import { CareType } from "@/types/contracts/new-contract-req.dto";
import { ContractItem } from "@/types/contracts/contracts-list.dto";

const rateDict: Record<RateType, string> = {
  daily: "Dagelijks",
  hourly: "Per uur",
  minute: "Per minuut",
  weekly: "Per week",
  monthly: "Per maand",
};

export function getRate(item: ContractResDto | ContractItem) {
  const rate = item.price;

  return rate ? formatPrice(rate) : "No rate set";
}

export function rateType(item: ContractResDto | ContractItem) {
  return rateDict[item.price_frequency];
}

export function getRateUnit(
  item: ContractResDto | ContractItem
): QUnitType | OpUnitType {
  return unitDict[item.price_frequency];
}

export const tarifDict: Record<RateType, string> = {
  daily: "Tarief per dag",
  hourly: "Tarief per uur",
  minute: "Tarief per minuut",
  weekly: "Tarief per week",
  monthly: "Tarief per maand",
};

export const unitDict: Record<RateType, QUnitType | OpUnitType> = {
  daily: "day",
  hourly: "hour",
  minute: "minute",
  weekly: "week",
  monthly: "month",
};

export function rateString(item: ContractResDto) {
  return tarifDict[item.price_frequency];
}

export function calculateTotalRate(item: ContractResDto) {
  const from = dayjs(item.start_date);
  const to = dayjs(item.end_date);
  const duration = to.diff(from, getRateUnit(item));
  return item.price ? formatPrice(item.price * duration) : "No rate set";
}
