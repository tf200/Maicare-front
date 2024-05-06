"use client";

import React, { FunctionComponent, useState } from "react";
import Panel from "@/components/Panel";
import Button from "@/components/buttons/Button";
import RoleAssignmentForm from "@/components/forms/RoleAssignmentForm";
import { useListRoleAssignments } from "@/utils/role-assignements/list-role-assignments";
import Loader from "@/components/common/Loader";
import { AssignedRolesListItem } from "@/types/role-assignments/assigned-roles-list.dto";
import { dateFormat } from "@/utils/timeFormatting";
import { ORGANIGRAM_TRANSLATE } from "@/consts";
import TrashIcon from "@/components/icons/TrashIcon";
import { useDeleteRoleAssignment } from "@/utils/permissions";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";

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
          <Button
            onClick={() => setIsAssigning((is) => !is)}
            buttonType={isAssigning ? "Outline" : "Primary"}
          >
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
              roles={roleAssignments}
              employeeId={+employeeId}
            />
            <div className="border-stroke w-full border-t my-4" />
          </>
        )}
        {/* <RolesList
          title={"ROLLEN DIE AUTOMATISCH TOEGEWEZEN ZIJN"}
          roles={[
            {
              group_name: "Default",
              id: 0,
              start_date: null,
              end_date: null,
              disableDelete: true,
            },
          ]}
          employeeId={+employeeId}
        /> */}
      </Panel>
    </div>
  );
};

export default Page;

type RolesListProps = {
  title: string;
  roles: (AssignedRolesListItem & { disableDelete?: boolean })[];
  employeeId: number;
};

const RolesList: FunctionComponent<RolesListProps> = ({
  title,
  roles,
  employeeId,
}) => {
  const { mutate: deleteAssignment } = useDeleteRoleAssignment(employeeId);

  const { open: openDeleteModal } = useModal(
    getDangerActionConfirmationModal({
      title: "Rol verwijderen",
      msg: "Weet u zeker dat u deze rol wilt verwijderen?",
    })
  );
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
              <th />
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>
                  {ORGANIGRAM_TRANSLATE[role.group_name] ?? role.group_name}
                </td>
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
                <td>
                  <div className="w-full flex justify-end">
                    {!role.disableDelete && (
                      <button
                        onClick={() => {
                          // Delete role
                          openDeleteModal({
                            onConfirm: () => {
                              deleteAssignment(role.id);
                            },
                          });
                        }}
                        className="block"
                      >
                        <TrashIcon />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
