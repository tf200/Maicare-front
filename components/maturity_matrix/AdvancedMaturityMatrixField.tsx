import { useField } from "formik";
import MaturityMatrixTable from ".";
import { cn } from "@/utils/cn";
import { selectedAssessment } from "@/utils/domains";
import { toast } from "react-toastify";

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

  // // Toast errors if form submitted
  // if (meta.error && meta.touched) {
  //   toast.error(meta.error);
  // }

  console.log("Value:", field.value);

  return (
    <div className={cn("py-5", className)}>
      <MaturityMatrixTable
        clientId={clientId}
        selectedAssessments={field.value}
        // setSelectedAssessments={(selectedAssessments) => helper.setValue(selectedAssessments)}
        onChange={({ selectedAssessment, isNew }) => {
          console.log("on Change:", selectedAssessment);
        }}
        onSelectedAssessmentsChange={(selectedAssessments) => {
          // setSelectedAssessments(domainLevels);
          console.log("onSelectedAssessmentsChange:", selectedAssessments);
          helper.setValue(selectedAssessments);
        }}
      />
    </div>
  );
}
