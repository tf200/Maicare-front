"use client";

import React, { FunctionComponent, useState } from "react";
import { EducationListDto } from "@/types/educations";
import { EducationResDto } from "@/types/educations";
import DetailCell from "@/components/DetailCell";
import { dateFormat } from "@/utils/timeFormatting";
import PencilSquare from "@/components/icons/PencilSquare";
import IconButton from "@/components/buttons/IconButton";
import EducationForm from "@/components/forms/EducationForm";
import TrashIcon from "@/components/icons/TrashIcon";
import styles from "./styles.module.css";
import clsx from "clsx";
import CheckIcon from "@/components/icons/CheckIcon";
import { useDeleteEducation } from "@/utils/educations/delete-education";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";

type Props = {
  data: EducationListDto;
};

const EducationsList: FunctionComponent<Props> = ({ data }) => {
  return (
    <table className={styles.table}>
      <tbody>
        {data.results.map((education) => (
          <EducationItem key={education.id} education={education} />
        ))}
      </tbody>
    </table>
  );
};

export default EducationsList;

type EducationItemProps = {
  education: EducationResDto;
};

const EducationItem: FunctionComponent<EducationItemProps> = ({ education }) => {
  const [isEdit, setIsEdit] = useState(false);
  const {
    mutate: deleteEduction,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteEducation(education.employee);
  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet u zeker dat u deze opleiding wilt verwijderen?",
      title: "Opleiding Verwijderen",
    })
  );
  return (
    <>
      <tr>
        <td>
          <DetailCell
            label={"Periode"}
            value={dateFormat(education.start_date) + " - " + dateFormat(education.end_date)}
          />
        </td>
        <td>
          <DetailCell label={"Naam Instituut"} value={education.institution_name} />
        </td>
        <td>
          <DetailCell
            label={"Diploma"}
            value={
              <div>
                <strong>{education.degree}</strong> | <span>{education.field_of_study}</span>
              </div>
            }
          />
        </td>
        <td className="flex justify-end">
          <div className="flex items-center gap-4">
            <IconButton onClick={() => setIsEdit((v) => !v)}>
              <PencilSquare className="w-5 h-5" />
            </IconButton>
            <IconButton
              buttonType="Danger"
              onClick={() => {
                open({
                  onConfirm: () => {
                    deleteEduction(education.id);
                  },
                });
              }}
              disabled={isDeleted}
              isLoading={isDeleting}
            >
              {isDeleted ? <CheckIcon className="w-5 h-5" /> : <TrashIcon className="w-5 h-5" />}
            </IconButton>
          </div>
        </td>
      </tr>
      {isEdit && (
        <tr>
          <td colSpan={4} className={clsx("bg-c_gray dark:bg-graydark p-8", styles.formTd)}>
            <EducationForm
              mode="update"
              initialData={education}
              onSuccess={() => setIsEdit(false)}
              employeeId={education.employee}
            />
          </td>
        </tr>
      )}
    </>
  );
};
