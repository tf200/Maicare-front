import { useField } from "formik";
import MaturityMatrixTable, { ModeType } from ".";
import { cn } from "@/utils/cn";
import { selectedAssessment } from "@/utils/domains";

type AdvancedMaturityMatrixFieldProps = {
  name: string;
  clientId: number;
  className?: string;
  mode?: ModeType;
  startDate?: string;
  endDate?: string;
};

export default function AdvancedMaturityMatrixField({
  name,
  clientId,
  className = "",
  mode = "create",
  ...rest
}: AdvancedMaturityMatrixFieldProps) {
  const [field, meta, helper] = useField<selectedAssessment[]>(name);

  // // Toast errors if form submitted
  // if (meta.error && meta.touched) {
  //   toast.error(meta.error);
  // }

  return (
    <div className={cn("py-5", className)}>
      <MaturityMatrixTable
        mode={mode}
        clientId={clientId}
        selectedAssessments={field.value}
        // onChange={({ selectedAssessment, isNew }) => {
        //   // console.log("on Change:", selectedAssessment);
        // }}
        onSelectedAssessmentsChange={(selectedAssessments) => {
          // setSelectedAssessments(domainLevels);
          helper.setValue(selectedAssessments);
        }}
        {...rest}
      />
    </div>
  );
}
