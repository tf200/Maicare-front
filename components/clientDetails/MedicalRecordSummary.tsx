import React, { FunctionComponent } from "react";
import DiagnosisSummary from "@/components/medicalRecordOverview/DiagnosisSummary";
import MedicationsSummary from "@/components/medicalRecordOverview/MedicationsSummary";
import AllergiesSummary from "@/components/medicalRecordOverview/AllergiesSummary";
type Props = {
  clientId: number;
};

const MedicalRecordSummary: FunctionComponent<Props> = ({ clientId }) => {
  return (
    <div>
      <h2 className="py-2 px-4 text-sm font-medium uppercase">allergies</h2>
      <AllergiesSummary clientId={clientId} count={2} />
      <div className="border-stroke w-full border-t my-4" />
      <h2 className="py-2 px-4 text-sm font-medium uppercase">Diagnosis</h2>
      <DiagnosisSummary clientId={clientId} />
      <div className="border-stroke w-full border-t my-4" />
      <h2 className="py-2 px-4 text-sm font-medium uppercase">Medications</h2>
      <MedicationsSummary clientId={clientId} count={2} />
    </div>
  );
};

export default MedicalRecordSummary;
