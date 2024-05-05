"use client";

import React, { FunctionComponent } from "react";
import { useListRoleAssignments } from "@/utils/role-assignements/list-role-assignments";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";
import { useRouter } from "next/navigation";
import { dateFormat } from "@/utils/timeFormatting";
import { ORGANIGRAM_TRANSLATE } from "@/consts";

type Props = {
  employeeId: number;
};

const EmployeeRolesSummary: FunctionComponent<Props> = ({ employeeId }) => {
  const { data, isLoading } = useListRoleAssignments(employeeId);
  const router = useRouter();
  if (isLoading) return <Loader />;

  if (data?.length === 0) return <div>Geen rollen gevonden</div>;
  if (!data) return null;
  return (
    <ul className="flex flex-col gap-2">
      {data?.map((role) => {
        return (
          <li
            onClick={() => router.push(`/employees/${employeeId}/teams`)}
            className="grid grid-cols-2 hover:bg-gray-3 p-2 cursor-pointer rounded-xl"
          >
            <DetailCell
              ignoreIfEmpty={true}
              label={"Rol"}
              value={
                ORGANIGRAM_TRANSLATE[role.group_name] ??
                role.group_name ??
                "Niet gespecificeerd"
              }
            />

            <DetailCell
              ignoreIfEmpty={true}
              label={"Periode"}
              value={
                <>
                  {role.start_date ? (
                    <>
                      Van <strong>{dateFormat(role.start_date)}</strong>
                    </>
                  ) : (
                    <>
                      <strong>Altijd</strong> vanaf
                    </>
                  )}
                  {" - "}
                  {role.end_date ? (
                    <>
                      Tot <strong>{dateFormat(role.end_date)}</strong>
                    </>
                  ) : (
                    <>
                      voor <strong>onbepaalde</strong> tijd
                    </>
                  )}
                </>
              }
            />
          </li>
        );
      })}
    </ul>
  );
};

export default EmployeeRolesSummary;
