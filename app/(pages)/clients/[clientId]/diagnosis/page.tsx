"use client";

import React, { FunctionComponent } from "react";
import { useQuery } from "react-query";
import api from "@/utils/api";
import { DiagnosisListDto } from "@/types/diagnosis/diagnosis-list-dto";
import Link from "next/link";

type Props = {
  params: { clientId: string };
};

const DiagnosisPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { data, isLoading } = useQuery(
    [
      "diagnosis",
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
  return (
    <div>
      <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Diagnosis list (WORK IN PROGRESS!)
          </h3>
        </div>

        <div className="p-4 md:p-6 xl:p-9">
          <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-20">
            <Link
              href={`/clients/${clientId}/diagnosis/new`}
              className="inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Add new diagnosis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisPage;
