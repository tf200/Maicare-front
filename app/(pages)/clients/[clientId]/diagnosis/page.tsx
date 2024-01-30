"use client";

import React, { FunctionComponent } from "react";
import { useQuery } from "react-query";
import api from "@/utils/api";
import { DiagnosisListDto } from "@/types/diagnosis/diagnosis-list-dto";

type Props = {
  params: { clientId: string };
};

const DiagnosticsPage: FunctionComponent<Props> = ({
  params: { clientId },
}) => {
  const { data, isLoading } = useQuery(
    [
      "diagnostics",
      {
        client: clientId,
      },
    ],
    async () => {
      const response = await api.get<DiagnosisListDto>(
        `client/diagnosis_list/${clientId}`
      );
      return response.data;
    }
  );
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
};

export default DiagnosticsPage;
