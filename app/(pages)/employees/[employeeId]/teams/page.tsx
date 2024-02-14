"use client";

import React, { FunctionComponent, useState } from "react";
import Panel from "@/components/Panel";
import { dateFormat } from "@/utils/timeFormatting";
import Button from "@/components/buttons/Button";
import RoleAssignmentForm from "@/components/forms/RoleAssignmentForm";

type Props = {
  params: { employeeId: string };
};

const Page: FunctionComponent<Props> = ({ params: { employeeId } }) => {
  const [isAssigning, setIsAssigning] = useState(false);
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
        {isAssigning && (
          <RoleAssignmentForm
            employeeId={+employeeId}
            onSuccess={() => {
              setIsAssigning(false);
            }}
          />
        )}
        <RolesList
          title={"Manual Roles"}
          roles={[
            {
              id: 1,
              name: "Backoffice",
              from_date: "2021-01-01",
              to_date: "2021-12-31",
              range: "Standard Access",
            },
            {
              id: 2,
              name: "Ambulatory Care",
              from_date: "2021-01-01",
              to_date: "2021-12-31",
              range: "Standard Access",
            },
          ]}
        />
        <div className="border-stroke w-full border-t my-4" />
        <RolesList
          title={"Automatic Roles"}
          roles={[
            {
              id: 3,
              name: "Standard Role",
              from_date: "All time",
              to_date: "All time",
              range: "Standard Access",
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
  roles: RoleAssignment[];
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
              <td>
                {dateFormat(role.from_date)} - {dateFormat(role.to_date)}
              </td>
              <td>{role.range}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

type RoleAssignment = {
  id: number;
  name: string;
  from_date: string;
  to_date: string;
  range: "Standard Access" | "Limited Access" | "Full Access";
};
