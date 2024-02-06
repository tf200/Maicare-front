"use client";

import React, { Fragment, FunctionComponent } from "react";
import { useClientContractsList } from "@/utils/contracts/getClientContractsList";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";
import { ContractResDto } from "@/types/contracts/contract-res.dto";
import { dateFormat, shortDateFormat } from "@/utils/timeFormatting";

type Props = {
  clientId: number;
};

const ContractsSummary: FunctionComponent<Props> = ({ clientId }) => {
  const { data, isLoading, isError } = useClientContractsList(clientId, {
    page_size: 3,
  });
  if (isLoading) return <Loader />;
  if (isError)
    return <div className="text-red">Sorry! we failed to load contracts</div>;

  return (
    <section className="grid grid-cols-3 gap-2">
      {data.results?.map((item) => (
        <div className="contents cursor-pointer" key={item.id}>
          <DetailCell label={"Care type"} value={item.care_type} />
          <DetailCell
            label={"Care period"}
            value={`${shortDateFormat(item.start_date)} - ${shortDateFormat(item.end_date)}`}
          />
          <DetailCell label={rateType(item)} value={getRate(item)} />
        </div>
      ))}
    </section>
  );
};

export default ContractsSummary;

function rateType(item: ContractResDto) {
  return item.rate_per_day
    ? "Rate per day"
    : item.rate_per_hour
      ? "Rate per hour"
      : "Rate per minute";
}

function getRate(item: ContractResDto) {
  const rate = item.rate_per_day || item.rate_per_hour || item.rate_per_minute;

  // rate in euro
  return rate ? rate + " €" : "No rate set";
}
