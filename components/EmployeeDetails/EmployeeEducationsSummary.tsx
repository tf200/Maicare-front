"use client";

import React, { FunctionComponent } from "react";
import { useListEducations } from "@/utils/educations/listEducations";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";
import { useRouter } from "next/navigation";
import { dateFormat } from "@/utils/timeFormatting";

type Props = {
  employeeId: number;
};

const EmployeeCertificationsSummary: FunctionComponent<Props> = ({
  employeeId,
}) => {
  const { data, isLoading } = useListEducations(employeeId);
  const router = useRouter();
  if (isLoading) return <Loader />;

  if (data.results?.length === 0) return <div>Geen opleidingen gevonden</div>;
  return (
    <ul className="flex flex-col gap-2">
      {data.results?.map((education) => {
        return (
          <li
            key={education.id}
            onClick={() => router.push(`/employees/${employeeId}/educations`)}
            className="grid grid-cols-3 hover:bg-gray-3 p-2 cursor-pointer rounded-xl"
          >
            <DetailCell
              ignoreIfEmpty={true}
              label={"Periode"}
              value={
                education?.start_date || education?.end_date
                  ? dateFormat(education?.start_date) +
                    " - " +
                    dateFormat(education?.end_date)
                  : "Niet gespecificeerd"
              }
            />

            <DetailCell
              ignoreIfEmpty={true}
              label={"Naam Instituut"}
              value={education.institution_name || "Niet gespecificeerd"}
            />

            <DetailCell
              ignoreIfEmpty={true}
              label={"Diploma"}
              value={
                education?.degree || education?.field_of_study
                  ? education?.degree + " | " + education?.field_of_study
                  : "Niet gespecificeerd"
              }
            />
          </li>
        );
      })}
    </ul>
  );
};

export default EmployeeCertificationsSummary;
