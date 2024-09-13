import InputField from "@/components/FormFields/InputField";
import Panel from "@/components/Panel";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import React, { useEffect } from "react";
import * as Yup from "yup";

export const clientInitialValue = {
  client_full_name: "",
  client_SKN: "",
  client_number: "",
  client_phone: "",
};

export const clientShema = {
  client_full_name: Yup.string().required("moet dit veld invullen"),
  client_SKN: Yup.string().optional(),
  client_number: Yup.string().required("moet dit veld invullen"),
  client_phone: Yup.string().required("moet dit veld invullen"),
};

export default function ClientForm({
  handleChange,
  values,
  handleBlur,
  touched,
  errors,
  client_id,
  setFieldValue,
}) {
  const { data, isLoading } = useClientDetails(client_id);


  useEffect(() => {
    if (data) {
      setFieldValue("client_full_name", `${data.first_name} ${data.last_name}`);
      setFieldValue("client_number", `${data.filenumber}`);
      setFieldValue("client_phone", data.phone_number);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Panel title={"1. Cliënt"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <div className="flex flex-col gap-4">
          <InputField
            label="Naam"
            className={"w-full"}
            id={"client_full_name"}
            required={true}
            type={"text"}
            value={values.client_full_name}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled
            error={touched.client_full_name && errors.client_full_name}
          />
          <div className="flex  gap-4">
            <InputField
              label="SKN"
              className={"w-1/2"}
              id={"client_SKN"}
              required={false}
              type={"text"}
              value={values.client_SKN}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.client_SKN && errors.client_SKN}
            />
            <InputField
              label="Cliëntnummer"
              className={"w-1/2"}
              id={"client_number"}
              required={true}
              type={"text"}
              disabled
              value={values.client_number}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.client_number && errors.client_number}
            />
          </div>
          <InputField
            label="Telefoonummer"
            className={"w-full"}
            id={"client_phone"}
            required={true}
            type={"text"}
            disabled
            value={values.client_phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.client_phone && errors.client_phone}
          />
        </div>
      </div>
    </Panel>
  );
}
