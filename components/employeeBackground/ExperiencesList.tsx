"use client";

import React, { FunctionComponent, useState } from "react";
import { ExpListDto } from "@/types/experiences/exp-list.dto";
import { ExpResDto } from "@/types/experiences/exp-res.dto";
import DetailCell from "@/components/DetailCell";
import { dateFormat } from "@/utils/timeFormatting";
import PencilSquare from "@/components/icons/PencilSquare";
import IconButton from "@/components/buttons/IconButton";
import ExperienceForm from "@/components/forms/ExperienceForm";
import TrashIcon from "@/components/icons/TrashIcon";
import styles from "./styles.module.css";
import clsx from "clsx";
import { useDeleteExperience } from "@/utils/experiences/delete-experience";
import CheckIcon from "@/components/icons/CheckIcon";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";

type Props = {
  data: ExpListDto;
};

const ExperiencesList: FunctionComponent<Props> = ({ data }) => {
  return (
    <table className={styles.table}>
      <tbody>
        {data.results.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </tbody>
    </table>
  );
};

export default ExperiencesList;

type ExperienceItemProps = {
  experience: ExpResDto;
};

const ExperienceItem: FunctionComponent<ExperienceItemProps> = ({
  experience,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const {
    mutate: deleteExp,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteExperience(experience.employee);
  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet u zeker dat u deze ervaring wilt verwijderen?",
      title: "Ervaring Verwijderen",
    })
  );
  return (
    <>
      <tr>
        <td>
          <DetailCell label={"Functietitel"} value={experience.job_title} />
        </td>
        <td>
          <DetailCell label={"Bedrijfsnaam"} value={experience.company_name} />
        </td>
        <td>
          <DetailCell
            label={"Periode"}
            value={
              dateFormat(experience.start_date) +
              " - " +
              dateFormat(experience.end_date)
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
                    deleteExp(experience.id);
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
          </div>
        </td>
      </tr>
      {isEdit && (
        <tr>
          <td
            colSpan={4}
            className={clsx("bg-gray dark:bg-graydark p-8", styles.formTd)}
          >
            <ExperienceForm
              mode="update"
              initialData={experience}
              onSuccess={() => setIsEdit(false)}
              employeeId={experience.employee}
            />
          </td>
        </tr>
      )}
    </>
  );
};
