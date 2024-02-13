"use client";

import React, { FunctionComponent, useState } from "react";
import { useListCertificates } from "@/utils/certificates/listCertificates";
import Button from "@/components/buttons/Button";
import CertificationForm from "@/components/forms/CertificationForm";
import Loader from "@/components/common/Loader";
import LargeErrorMessage from "@/components/LargeErrorMessage";
import Panel from "@/components/Panel";
import CertificatesList from "@/components/employeeBackground/CertificatesList";

type Props = {
  params: {
    employeeId: string;
  };
};

const CertificatesPage: FunctionComponent<Props> = ({
  params: { employeeId },
}) => {
  const { data, error, isLoading } = useListCertificates(+employeeId);
  const [isAdding, setIsAdding] = useState(false);
  return (
    <Panel title={"Certificates"} containerClassName="py-4 px-7">
      <div className="mb-4.5">
        <Button
          className="w-72 block ml-auto"
          onClick={() => setIsAdding(true)}
        >
          + Add Certificate
        </Button>
      </div>
      {isAdding && (
        <CertificationForm
          employeeId={+employeeId}
          onSuccess={() => setIsAdding(false)}
        />
      )}
      {data && <CertificatesList data={data} />}
      {isLoading && <Loader />}
      {error && (
        <LargeErrorMessage
          firstLine="Something went wrong"
          secondLine="An error occurred while fetching certificates"
        />
      )}
    </Panel>
  );
};

export default CertificatesPage;
