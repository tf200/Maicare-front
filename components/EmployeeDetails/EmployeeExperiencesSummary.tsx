"use client";

import React, { FunctionComponent } from "react";
import { useListExperiences } from "@/utils/experiences/list-experiences";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";
import { useRouter } from "next/navigation";
import { dateFormat } from "@/utils/timeFormatting";

type Props = {
  employeeId: number;
};

const EmployeeExperiencesSummary: FunctionComponent<Props> = ({ employeeId }) => {
  const { data, isLoading } = useListExperiences(employeeId);
  const router = useRouter();
  if (isLoading) return <Loader />;

  if (data.results?.length === 0) return <div>Geen ervaringen gevonden</div>;
  return (
    <ul className="flex flex-col gap-2">
      {data.results?.map((education) => {
        return (
          <li
            key={education.id}
            onClick={() => router.push(`/employees/${employeeId}/experiences`)}
            className="grid grid-cols-3 hover:bg-gray-3 dark:hover:bg-slate-700 p-4 cursor-pointer rounded-xl"
          >
            <DetailCell
              ignoreIfEmpty={true}
              label={"Functietitel"}
              value={education.job_title || "Niet gespecificeerd"}
            />

            <DetailCell
              ignoreIfEmpty={true}
              label={"Bedrijfsnaam"}
              value={education.company_name || "Niet gespecificeerd"}
            />

            <DetailCell
              ignoreIfEmpty={true}
              label={"Periode"}
              value={
                education?.start_date || education?.end_date
                  ? education?.start_date + " - " + education?.end_date
                  : "Niet gespecificeerd"
              }
            />
          </li>
        );
      })}
    </ul>
  );
};

export default EmployeeExperiencesSummary;
