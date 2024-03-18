"use client";

import React, { FunctionComponent, useState } from "react";
import Panel from "@/components/Panel";
import Button from "@/components/buttons/Button";
import RoleAssignmentForm from "@/components/forms/RoleAssignmentForm";
import { useListRoleAssignments } from "@/utils/role-assignements/list-role-assignments";
import Loader from "@/components/common/Loader";
import { AssignedRolesListItem } from "@/types/role-assignments/assigned-roles-list.dto";
import { dateFormat } from "@/utils/timeFormatting";
import { BACK_OFFICE, ORGANIGRAM_TRANSLATE } from "@/consts";

type Props = {
  params: { employeeId: string };
};

const Page: FunctionComponent<Props> = ({ params: { employeeId } }) => {
  const [isAssigning, setIsAssigning] = useState(false);
  const { data: roleAssignments, isLoading: roleAssignmentsLoading } =
    useListRoleAssignments(+employeeId);
  return (
    <div>
      <Panel
        title={"Teambeheer"}
        sideActions={
          <Button onClick={() => setIsAssigning((is) => !is)}>
            {/*Cancel | Assign a new team*/}
            {isAssigning ? "Annuleren" : "+ Toevoegen Team"}
          </Button>
        }
        containerClassName="px-7 py-4"
      >
        {isAssigning && (
          <>
            <RoleAssignmentForm
              employeeId={+employeeId}
              onSuccess={() => {
                setIsAssigning(false);
              }}
            />
            <div className="border-stroke w-full border-t my-4" />
          </>
        )}
        {roleAssignmentsLoading && <Loader />}
        {roleAssignments && (
          <>
            {/*Manual Roles*/}
            <RolesList
              title={"HANDMATIGE ROLLEN"}
              roles={roleAssignments.groups}
            />
            <div className="border-stroke w-full border-t my-4" />
          </>
        )}
        <RolesList
          title={"ROLLEN DIE AUTOMATISCH TOEGEWEZEN ZIJN"}
          roles={[
            {
              group_name: "Default",
              start_date: null,
              end_date: null,
            },
          ]}
        />
      </Panel>
    </div>
  );
};

export default Page;

type RolesListProps = {
  title: string;
  roles: AssignedRolesListItem[];
};

const RolesList: FunctionComponent<RolesListProps> = ({ title, roles }) => {
  return (
    <div>
      <h2 className="py-2 px-4 text-sm font-medium uppercase">{title}</h2>
      {roles.length === 0 && (
        <div className="px-5 py-4">
          {/*No manual roles assigned*/}
          Geen handmatige rollen toegewezen
        </div>
      )}
      {roles.length > 0 && (
        <table className="datatable-table">
          <thead>
            <tr>
              {/* Role */}
              <th>Rol</th>
              {/* Period */}
              <th>Periode</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.group_name}>
                <td>{ORGANIGRAM_TRANSLATE[role.group_name]}</td>
                {/* From Always - indefinitely */}
                <td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
