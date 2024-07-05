import { useField } from "formik";
import MaturityMatrixTable from ".";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { SetDomainLevelReqDto } from "@/types/goals";
import { selectedAssessment } from "@/utils/domains";

type AdvancedMaturityMatrixFieldProps = {
  name: string;
  clientId: number;
  className?: string;
};

export default function AdvancedMaturityMatrixField({
  name,
  clientId,
  className = "",
}: AdvancedMaturityMatrixFieldProps) {
  const [field, meta, helper] = useField<selectedAssessment[]>(name);

  return (
    <div className={cn("py-5", className)}>
      <MaturityMatrixTable
        clientId={clientId}
        selectedMatrixAssessments={field.value}
        onDomainLevelsChange={(domainLevels) => {
          // setSelectedAssessments(domainLevels);
          helper.setValue(domainLevels);
        }}
      />
    </div>
  );
}
