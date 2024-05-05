"use client";

import React, { FunctionComponent, useEffect, useState } from "react";
import {
  useGroupDetails,
  usePermissions,
  useUpdateGroup,
} from "@/utils/permissions";
import { ADMIN, ORGANIGRAM_TRANSLATE, PERMISSION_TRANS } from "@/consts";
import CheckboxItem from "@/components/FormFields/CheckboxItem";
import Loader from "@/components/common/Loader";
import Button from "@/components/buttons/Button";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import { getAckModal } from "@/components/Modals/Modal";

const Page: FunctionComponent<{
  params: { groupId: string };
}> = (props) => {
  return <PermissionManagement groupId={parseInt(props.params.groupId)} />;
};

export default Page;

const PermissionManagement: FunctionComponent<{
  groupId: number;
}> = ({ groupId }) => {
  const { data: permissions, isLoading: isLoadingPerms } = usePermissions();
  const { data: groupDetails, isLoading: isLoadingGroups } =
    useGroupDetails(groupId);
  const { mutate: updateGroup, isLoading: isUpdatingGroup } =
    useUpdateGroup(groupId);

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  useEffect(() => {
    setSelectedPermissions(groupDetails?.permissions || []);
  }, [groupDetails]);

  const { open: openConfirmUpdate } = useModal(
    getDangerActionConfirmationModal({
      msg: "Dit zijn systeembrede wijzigingen, weet je zeker dat je door wilt gaan?",
      title: "Weet je het zeker?",
    })
  );

  const { open: openSucccessModal } = useModal(
    getAckModal({
      children: "De groep is succesvol bijgewerkt",
      modalTitle: "Succesvol",
    })
  );

  if (isLoadingPerms || isLoadingGroups) {
    return <Loader />;
  }

  if (!permissions || !groupDetails) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <h1 className="p-4">
        {ORGANIGRAM_TRANSLATE[groupDetails.name] ?? groupDetails.name}
      </h1>
      <div className="p-4 flex overflow-auto flex-col flex-wrap gap-4 border-y border-stroke dark:border-strokedark">
        {permissions?.map((permission) => (
          <div key={permission}>
            <CheckboxItem
              label={PERMISSION_TRANS[permission]}
              onClick={() => {
                setSelectedPermissions((prev) =>
                  prev.includes(permission)
                    ? prev.filter((p) => p !== permission)
                    : [...prev, permission]
                );
              }}
              checked={selectedPermissions.includes(permission)}
            />
          </div>
        ))}
      </div>
      {groupDetails.name !== ADMIN && (
        <div className="flex justify-end p-4">
          <Button
            isLoading={isUpdatingGroup}
            disabled={isUpdatingGroup}
            onClick={() => {
              openConfirmUpdate({
                onConfirm: () => {
                  updateGroup(
                    { permissions: selectedPermissions },
                    {
                      onSuccess: () => {
                        openSucccessModal({});
                      },
                    }
                  );
                },
              });
            }}
          >
            Opslaan
          </Button>
        </div>
      )}
    </div>
  );
};
