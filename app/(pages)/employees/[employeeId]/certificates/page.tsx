"use client";

import React, { FunctionComponent } from "react";
import { useListCertificates } from "@/utils/certificates/listCertificates";
import CertificationForm from "@/components/forms/CertificationForm";
import CertificatesList from "@/components/employeeBackground/CertificatesList";
import EmployeeBackground from "@/components/employeeBackground/EmployeeBackground";

type Props = {
  params: {
    employeeId: string;
  };
};

const CertificatesPage: FunctionComponent<Props> = ({
  params: { employeeId },
}) => {
  const query = useListCertificates(+employeeId);
  return (
    <EmployeeBackground
      title={"Certificaten"}
      addButtonText={"+ Certificaat Toevoegen"}
      cancelText={"Toevoegen Certificaat Annuleren"}
      errorText={"Een fout trad op tijdens het ophalen van certificaten."}
      employeeId={+employeeId}
      query={query}
      ListComponent={CertificatesList}
      FormComponent={CertificationForm}
    />
  );
};

export default CertificatesPage;
