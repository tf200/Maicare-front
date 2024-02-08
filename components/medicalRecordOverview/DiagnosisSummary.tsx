"use client";

import React, { FunctionComponent } from "react";
import { useLatestDiagnosis } from "@/utils/diagnosis/getLatestDiagnosis";
import Loader from "@/components/common/Loader";
import Severity from "@/components/Severity";
import { useRouter } from "next/navigation";
import { DiagnosisListItem } from "@/types/diagnosis/diagnosis-list-res-dto";

type Props = {
  clientId: number;
};

const DiagnosisSummary: FunctionComponent<Props> = ({ clientId }) => {
  const { data, isLoading } = useLatestDiagnosis(clientId, 5);
  if (isLoading) return <Loader />;
  if (data.results?.length === 0) return <div>No diagnosis found</div>;
  return (
    <ul className="flex flex-col gap-2">
      {data.results?.map((diagnosis) => {
        return <DiagnosisItem key={diagnosis.id} diagnosis={diagnosis} />;
      })}
    </ul>
  );
};

export default DiagnosisSummary;

type DiagnosisItemProps = {
  diagnosis: DiagnosisListItem;
};

const DiagnosisItem: FunctionComponent<DiagnosisItemProps> = ({
  diagnosis,
}) => {
  const router = useRouter();
  return (
    <li
      className="grid grid-cols-3 px-4 py-2 cursor-pointer hover:bg-gray-3 rounded-2xl"
      onClick={() =>
        router.push(`/clients/${diagnosis.client}/diagnosis/${diagnosis.id}`)
      }
    >
      <div>{diagnosis.title}</div>
      <div className="flex items-center justify-center">
        <Severity severity={diagnosis.severity} />
      </div>
      <div>{diagnosis.diagnosis_code}</div>
    </li>
  );
};
