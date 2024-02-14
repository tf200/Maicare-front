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
  return (
    <>
      <tr>
        <td>
          <DetailCell label={"Job Title"} value={experience.job_title} />
        </td>
        <td>
          <DetailCell label={"Company Name"} value={experience.company_name} />
        </td>
        <td>
          <DetailCell
            label={"Period"}
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
                deleteExp(experience.id);
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
