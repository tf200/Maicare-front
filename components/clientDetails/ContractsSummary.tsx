"use client";

import React, { Fragment, FunctionComponent } from "react";
import { useClientContractsList } from "@/utils/contracts/getClientContractsList";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";
import { ContractResDto } from "@/types/contracts/contract-res.dto";
import { dateFormat, shortDateFormat } from "@/utils/timeFormatting";
import { getRate, rateString } from "@/utils/contracts/rate-utils";

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
  if (!data) return <div>No data retrieved</div>;
  if (data.results?.length === 0)
    return <div>No contracts found for current client!</div>;
  return (
    <section className="grid grid-cols-3 gap-2">
      {data.results?.map((item) => (
        <div className="contents cursor-pointer" key={item.id}>
          <DetailCell label={"Care type"} value={item.care_type} />
          <DetailCell
            label={"Care period"}
            value={`${shortDateFormat(item.start_date)} - ${shortDateFormat(item.end_date)}`}
          />
          <DetailCell label={rateString(item)} value={getRate(item)} />
        </div>
      ))}
    </section>
  );
};

export default ContractsSummary;
