"use client";

import React, { FunctionComponent } from "react";
import Loader from "@/components/common/Loader";
import { useMedicationsList } from "@/utils/medications/getMedicationsList";
import { MedicationsResDto } from "@/types/medications/medications-res-dto";
import { dateFormat } from "@/utils/timeFormatting";

type Props = {
  clientId: number;
  count?: number;
};

const MedicationsSummary: FunctionComponent<Props> = ({ clientId, count }) => {
  const { data, isLoading, isError } = useMedicationsList(clientId, {
    page: 1,
    page_size: count || 5,
  });
  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-red">
        Een fout heeft ons verhinderd gegevens te laden.
      </div>
    );
  if (!data) return <div>Geen gegevens opgehaald.</div>;
  if (data.results?.length === 0)
    return <div>Geen medicatie geregistreerd voor cliënt</div>;
  return (
    <ul className="flex flex-col gap-2">
      {data.results?.map((medication) => {
        return <MedicationItem key={medication.id} medication={medication} />;
      })}
    </ul>
  );
};

export default MedicationsSummary;

type MedicationItemProps = {
  medication: MedicationsResDto;
};

const MedicationItem: FunctionComponent<MedicationItemProps> = ({
  medication,
}) => {
  return (
    <li className="grid grid-cols-3 px-4 py-2 cursor-pointer hover:bg-gray-3 rounded-2xl">
      <div>
        <div>
          <strong className="text-sm inline-block w-13">Van: </strong>{" "}
          <span className="inline-block">
            {dateFormat(medication.start_date)}
          </span>
        </div>{" "}
        <div>
          <strong className="text-sm inline-block w-13">tot: </strong>
          <span className="inline-block">
            {dateFormat(medication.end_date)}
          </span>
        </div>
      </div>
      <div>{medication.name}</div>
      <div>{medication.dosage}</div>
    </li>
  );
};
