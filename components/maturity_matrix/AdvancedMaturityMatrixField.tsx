import { useField } from "formik";
import MaturityMatrixTable from ".";
import { cn } from "@/utils/cn";

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
  const [field, meta, helper] = useField(name);

  return (
    <div className={cn("py-5", className)}>
      <MaturityMatrixTable clientId={clientId} />
    </div>
  );
}
