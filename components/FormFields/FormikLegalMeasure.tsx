import React, { FunctionComponent, useMemo } from "react";
import { SelectionOption } from "@/types/selection-option";
import Select, { SelectProps } from "@/components/FormFields/Select";
import { useFormikContext } from "formik";
import { ClientFormType } from "@/types/clients/client-form-type";
import { cn } from "@/utils/cn";

const FormikLegalMeasure: FunctionComponent<{
  className?: string;
  required?: boolean;
}> = ({ className, required }) => {
  const { values, touched, errors, handleChange, handleBlur } = useFormikContext<ClientFormType>();
  return (
    <LegalMeasureSelect
      id={"legal_measure"}
      name={"legal_measure"}
      placeholder={"Wettelijke maatregel"}
      className={cn("w-full mb-4.5", className)}
      value={values.legal_measure}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.legal_measure && errors.legal_measure}
      label={"Wettelijke maatregel"}
      required={required}
    />
  );
};

export default FormikLegalMeasure;

export const LegalMeasureSelect: FunctionComponent<Omit<SelectProps, "options">> = (props) => {
  const LegalMeasureOptions = useMemo<SelectionOption[]>(() => {
    return [
    {
      value: "Jeugdreclassering ",
      label: "Jeugdreclassering ",
    },
    {
      value: "Jeugdbescherming",
      label: "Jeugdbescherming",
    }
  ];
  }, []);
  return <Select {...props} options={LegalMeasureOptions} />;
};
