import React, { FunctionComponent, SelectHTMLAttributes, useMemo } from "react";
import { useLocations } from "@/utils/locations";
import { SelectionOption } from "@/types/selection-option";
import Select, { SelectProps } from "@/components/FormFields/Select";
import { useFormikContext } from "formik";
import { ClientFormType } from "@/types/clients/client-form-type";
import { cn } from "@/utils/cn";

const FormikLocation: FunctionComponent<{
  className?: string;
  required?: boolean;
}> = ({ className, required }) => {
  const { values, touched, errors, handleChange, handleBlur } =
    useFormikContext<ClientFormType>();
  return (
    <LocationSelect
      id={"location"}
      name={"location"}
      placeholder={"Locatie"}
      className={cn("w-full mb-4.5", className)}
      value={values.location}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.location && errors.location}
      label={"Locatie"}
      required={required}
    />
  );
};

export default FormikLocation;

export const LocationSelect: FunctionComponent<Omit<SelectProps, "options">> = (
  props
) => {
  const locationQuery = useLocations();
  const locationOptions = useMemo<SelectionOption[]>(() => {
    if (locationQuery.data) {
      const options = locationQuery.data.results.map((location) => ({
        value: location.id + "",
        label: location.name,
      }));

      return [
        {
          value: "",
          label: "Selecteer een locatie",
        },
      ].concat(options);
    }
    return [];
  }, [locationQuery]);
  return <Select {...props} options={locationOptions} />;
};
