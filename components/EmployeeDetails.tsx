import React, { useEffect } from "react";
import Panel from "@/components/Panel";

import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import { useDeleteEmployee } from "@/utils/employees/deleteEmployee";
import { useRouter } from "next/navigation";

import EmployeeInformation from "@/components/EmployeeDetails/EmployeeInformation";
import EmployeeCertificationsSummary from "@/components/EmployeeDetails/EmployeeCertificationsSummary";
import EmployeeEducationsSummary from "@/components/EmployeeDetails/EmployeeEducationsSummary";
import EmployeeExperiencesSummary from "@/components/EmployeeDetails/EmployeeExperiencesSummary";
import EmployeeRolesSummary from "@/components/EmployeeDetails/EmployeeRolesSummary";
import LinkButton from "@/components/buttons/LinkButton";
import Link from "next/link";
import IconButton from "@/components/buttons/IconButton";
import PencilSquare from "@/components/icons/PencilSquare";
import TrashIcon from "@/components/icons/TrashIcon";
import CheckIcon from "@/components/icons/CheckIcon";
import { SecureFragment } from "@/components/SecureWrapper";
import * as consts from "@/consts/permissions";
import ChangePasswordForm from "@/components/forms/ChangePasswordForm";

interface EmployeeDetailsProps {
  employeeId: number;
  showAsProfile?: boolean;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({
  employeeId,
  showAsProfile = false,
}) => {
  const router = useRouter();

  const {
    mutate: deleteEmployee,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteEmployee();

  useEffect(() => {
    if (isDeleted) {
      setTimeout(() => {
        router.push(`/employees`);
      }, 700);
    }
  }, [isDeleted]);

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet u zeker dat u deze medewerker wilt verwijderen?",
      title: "Medewerker Verwijderen",
    })
  );

  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9">
        <Panel
          title={"Medewerkerinformatie"}
          containerClassName="px-7 py-4"
          sideActions={
            showAsProfile && (
              <div className="flex gap-4">
                <SecureFragment permission={consts.EMPLOYEE_EDIT}>
                  <Link href={`/employees/${employeeId}/edit`}>
                    <IconButton>
                      <PencilSquare className="w-5 h-5" />
                    </IconButton>
                  </Link>
                </SecureFragment>

                <SecureFragment permission={consts.EMPLOYEE_DELETE}>
                  <IconButton
                    buttonType="Danger"
                    onClick={() => {
                      open({
                        onConfirm: () => {
                          deleteEmployee(employeeId);
                        },
                      });
                    }}
                    disabled={isDeleted}
                    isLoading={isDeleting}
                  >
                    {isDeleted ? (
                      <CheckIcon className="w-5 h-5" />
                    ) : (
                      <TrashIcon className="w-5 h-5" />
                    )}
                  </IconButton>
                </SecureFragment>
              </div>
            )
          }
        >
          <EmployeeInformation employeeId={employeeId} />
        </Panel>
        <Panel
          title={"Certificaten"}
          containerClassName="px-7 py-4"
          sideActions={
            <LinkButton
              text={"Volledige Certificatenlijst"}
              href={`/employees/${employeeId}/certificates`}
            />
          }
        >
          <EmployeeCertificationsSummary employeeId={employeeId} />
        </Panel>
      </div>
      <div className="flex flex-col gap-9">
        <Panel
          title={"Opleidingen"}
          containerClassName="px-7 py-4"
          sideActions={
            <LinkButton
              text={"Volledige Opleidingenlijst"}
              href={`/employees/${employeeId}/educations`}
            />
          }
        >
          <EmployeeEducationsSummary employeeId={employeeId} />
        </Panel>
        <Panel
          title={"Ervaringen"}
          containerClassName="px-7 py-4"
          sideActions={
            <LinkButton
              text={"Volledige Ervaringenlijst"}
              href={`/employees/${employeeId}/experiences`}
            />
          }
        >
          <EmployeeExperiencesSummary employeeId={employeeId} />
        </Panel>
        {!showAsProfile && (
          <Panel
            title={"Rollen"}
            containerClassName="px-7 py-4"
            sideActions={
              <LinkButton
                text={"Volledige Rollijst"}
                href={`/employees/${employeeId}/teams`}
              />
            }
          >
            <EmployeeRolesSummary employeeId={employeeId} />
          </Panel>
        )}
        {showAsProfile && (
          <Panel title={"Reset Password"} containerClassName={"px-7 py-4"}>
            <ChangePasswordForm />
          </Panel>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
