"use client";

import React, { FunctionComponent, useState } from "react";
import { useListCertificates } from "@/utils/certificates/listCertificates";
import Button from "@/components/buttons/Button";
import CertificationForm from "@/components/forms/CertificationForm";
import Loader from "@/components/common/Loader";
import LargeErrorMessage from "@/components/LargeErrorMessage";

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
    <div>
      <Button onClick={() => setIsAdding(true)}>Add Certificate</Button>
      {isAdding && (
        <CertificationForm
          employeeId={+employeeId}
          onSuccess={() => setIsAdding(false)}
        />
      )}
      {data?.results.map((cert) => <div>{cert.name}</div>)}
      {isLoading && <Loader />}
      {error && (
        <LargeErrorMessage
          firstLine="Something went wrong"
          secondLine="An error occurred while fetching certificates"
        />
      )}
    </div>
  );
};

export default CertificatesPage;
