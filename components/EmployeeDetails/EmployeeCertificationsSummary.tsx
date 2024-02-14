"use client";

import React, { FunctionComponent } from "react";
import { useListCertificates } from "@/utils/certificates/listCertificates";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";
import { useRouter } from "next/navigation";

type Props = {
  employeeId: number;
};

const EmployeeCertificationsSummary: FunctionComponent<Props> = ({
  employeeId,
}) => {
  const { data, isLoading } = useListCertificates(employeeId);
  const router = useRouter();
  if (isLoading) return <Loader />;

  console.log(data);

  if (data.results?.length === 0) return <div>No certifications found</div>;
  return (
    <ul className="flex flex-col gap-2">
      {data.results?.map((certificate) => {
        return (
          <li
            key={certificate.id}
            onClick={() => router.push(`/employees/${employeeId}/certificates`)}
            className="grid grid-cols-3 hover:bg-gray-3 p-2 cursor-pointer rounded-xl"
          >
            <DetailCell
              ignoreIfEmpty={true}
              label={"Title"}
              value={certificate.name}
            />

            <DetailCell
              ignoreIfEmpty={true}
              label={"Date Issued"}
              value={certificate.date_issued}
            />
            <DetailCell
              ignoreIfEmpty={true}
              label={"Issued By"}
              value={certificate.issued_by}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default EmployeeCertificationsSummary;
