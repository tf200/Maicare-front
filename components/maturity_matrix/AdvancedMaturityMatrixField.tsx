import { useField } from "formik";
import MaturityMatrixTable from ".";
import { cn } from "@/utils/cn";
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

  // // Toast errors if form submitted
  // if (meta.error && meta.touched) {
  //   toast.error(meta.error);
  // }

  return (
    <div className={cn("py-5", className)}>
      <MaturityMatrixTable
        clientId={clientId}
        selectedAssessments={field.value}
        // onChange={({ selectedAssessment, isNew }) => {
        //   // console.log("on Change:", selectedAssessment);
        // }}
        onSelectedAssessmentsChange={(selectedAssessments) => {
          // setSelectedAssessments(domainLevels);
          helper.setValue(selectedAssessments);
        }}
      />
    </div>
  );
}
