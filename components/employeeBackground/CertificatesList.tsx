"use client";

import React, { FunctionComponent, useState } from "react";
import { CertifListDto } from "@/types/certificates/certif-list.dto";
import { CertifResDto } from "@/types/certificates/certif-res.dto";
import DetailCell from "@/components/DetailCell";
import { fullDateFormat } from "@/utils/timeFormatting";
import PencilSquare from "@/components/icons/PencilSquare";
import IconButton from "@/components/buttons/IconButton";
import CertificationForm from "@/components/forms/CertificationForm";
import TrashIcon from "@/components/icons/TrashIcon";
import styles from "./styles.module.css";
import clsx from "clsx";
import { useDeleteCertificate } from "@/utils/certificates/delete-certificate";
import CheckIcon from "@/components/icons/CheckIcon";

type Props = {
  data: CertifListDto;
};

const CertificatesList: FunctionComponent<Props> = ({ data }) => {
  return (
    <table className={styles.table}>
      <tbody>
        {data.results.map((certificate) => (
          <CertificationItem key={certificate.id} certificate={certificate} />
        ))}
      </tbody>
    </table>
  );
};

export default CertificatesList;

type CertificationItemProps = {
  certificate: CertifResDto;
};

const CertificationItem: FunctionComponent<CertificationItemProps> = ({
  certificate,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const {
    mutate: deleteCert,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteCertificate(certificate.employee);
  return (
    <>
      <tr>
        <td>
          <DetailCell label={"Title"} value={certificate.name} />
        </td>
        <td>
          <DetailCell label={"Issued By"} value={certificate.issued_by} />
        </td>
        <td>
          <DetailCell
            label={"Date Issued"}
            value={fullDateFormat(certificate.date_issued)}
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
                deleteCert(certificate.id);
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
            <CertificationForm
              mode="update"
              initialData={certificate}
              onSuccess={() => setIsEdit(false)}
              employeeId={certificate.employee}
            />
          </td>
        </tr>
      )}
    </>
  );
};
