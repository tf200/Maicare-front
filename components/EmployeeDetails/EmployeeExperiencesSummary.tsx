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

const EmployeeExperiencesSummary: FunctionComponent<Props> = ({
  employeeId,
}) => {
  const { data, isLoading } = useListExperiences(employeeId);
  const router = useRouter();
  if (isLoading) return <Loader />;

  if (data.results?.length === 0) return <div>No experiences found</div>;
  return (
    <ul className="flex flex-col gap-2">
      {data.results?.map((education) => {
        return (
          <li
            key={education.id}
            onClick={() => router.push(`/employees/${employeeId}/experiences`)}
            className="grid grid-cols-3 hover:bg-gray-3 p-2 cursor-pointer rounded-xl"
          >
            <DetailCell
              ignoreIfEmpty={true}
              label={"Job Title"}
              value={education.job_title || "Not specified"}
            />

            <DetailCell
              ignoreIfEmpty={true}
              label={"Company Name"}
              value={education.company_name || "Not specified"}
            />

            <DetailCell
              ignoreIfEmpty={true}
              label={"Period"}
              value={
                education?.start_date || education?.end_date
                  ? education?.start_date + " - " + education?.end_date
                  : "Not specified"
              }
            />
          </li>
        );
      })}
    </ul>
  );
};

export default EmployeeExperiencesSummary;
