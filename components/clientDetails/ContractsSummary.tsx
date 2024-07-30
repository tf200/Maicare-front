"use client";

import React, { Fragment, FunctionComponent, useMemo } from "react";
import { useClientContractsList } from "@/utils/contracts/getClientContractsList";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";
import { ContractResDto } from "@/types/contracts/contract-res.dto";
import { dateFormat, shortDateFormat } from "@/utils/timeFormatting";
import { getRate, rateString } from "@/utils/contracts/rate-utils";
import { monthsBetween } from "@/utils/monthsBetween";
import dayjs from "dayjs";
import MonthsBetween from "@/components/MonthsBetween";

type Props = {
  clientId: number;
};

const ContractsSummary: FunctionComponent<Props> = ({ clientId }) => {
  const { data, isLoading, isError } = useClientContractsList(clientId, {
    page_size: 3,
  });
  if (isLoading) return <Loader />;
  if (isError)
    return <div className="text-red-600">Sorry! Het is ons niet gelukt om contracten te laden</div>;
  if (!data) return <div>Geen gegevens opgehaald.</div>;
  if (data.results?.length === 0) return <div>Geen contracten gevonden voor huidige cliënt!</div>;
  return (
    <section className="grid grid-cols-3 gap-2">
      {data.results?.map((item) => (
        <div className="contents cursor-pointer" key={item.id}>
          <DetailCell label={"Soort Hulpverlening"} value={item.care_type} />
          <DetailCell
            label={"Zorgperiode"}
            value={<MonthsBetween startDate={item.start_date} endDate={item.end_date} />}
          />
          <DetailCell label={rateString(item)} value={getRate(item)} />
        </div>
      ))}
    </section>
  );
};

export default ContractsSummary;
