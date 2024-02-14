"use client";

import React, { FunctionComponent, useState } from "react";
import Panel from "@/components/Panel";
import Button from "@/components/buttons/Button";
import RoleAssignmentForm from "@/components/forms/RoleAssignmentForm";
import { useListRoleAssignments } from "@/utils/role-assignements/list-role-assignments";
import { RoleListResDto } from "@/types/roles/role-list-res.dto";
import Loader from "@/components/common/Loader";

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
        title={"Teams Management"}
        sideActions={
          <Button onClick={() => setIsAssigning((is) => !is)}>
            {isAssigning ? "Cancel" : "+ Assign Role"}
          </Button>
        }
        containerClassName="px-7 py-4"
      >
        {roleAssignmentsLoading && (
          <span>
            <Loader />
          </span>
        )}
        {isAssigning && (
          <RoleAssignmentForm
            employeeId={+employeeId}
            onSuccess={() => {
              setIsAssigning(false);
            }}
          />
        )}
        {roleAssignments && (
          <RolesList title={"Manual Roles"} roles={roleAssignments} />
        )}
      </Panel>
    </div>
  );
};

export default Page;

type RolesListProps = {
  title: string;
  roles: RoleListResDto;
};

const RolesList: FunctionComponent<RolesListProps> = ({ title, roles }) => {
  return (
    <div>
      <h2 className="py-2 px-4 text-sm font-medium uppercase">{title}</h2>
      <table className="datatable-table">
        <thead>
          <tr>
            <th>Role</th>
            <th>Period</th>
            <th>Range</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>From Always - To Always</td>
              <td>Standard Range</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
