import React, { FunctionComponent } from "react";
import { FormikProvider, useFormik } from "formik";
import FormikRadioGroup from "@/components/FormFields/FormikRadioGroup";
import { STATUS_OPTIONS } from "@/consts";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import { usePatchClient } from "@/utils/clients/patchClient";
import Button from "@/components/buttons/Button";

const UpdateClientStatus: FunctionComponent<{
  clientId: number;
}> = (props) => {
  const { data } = useClientDetails(props.clientId);
  const { mutate, isLoading } = usePatchClient(props.clientId);
  const formik = useFormik({
    initialValues: {
      status: data?.status ?? undefined,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate({ status: values.status });
    },
  });
  const { handleSubmit, values, dirty } = formik;
  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <FormikRadioGroup
          picked={values.status}
          options={STATUS_OPTIONS}
          id={"status"}
          name={"status"}
          className="mb-4"
        />
        {dirty && (
          <Button type="submit" disabled={isLoading} isLoading={isLoading}>
            Bijwerken
          </Button>
        )}
      </form>
    </FormikProvider>
  );
};

export default UpdateClientStatus;
