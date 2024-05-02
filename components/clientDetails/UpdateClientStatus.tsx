import React, { FunctionComponent, useMemo } from "react";
import { FormikProvider, useFormik } from "formik";
import FormikRadioGroup from "@/components/FormFields/FormikRadioGroup";
import { STATUS_OPTIONS } from "@/consts";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import { usePatchClient } from "@/utils/clients/patchClient";
import Button from "@/components/buttons/Button";
import { useContractsList } from "@/utils/contracts/getContractsList";
import WarningIcon from "@/components/icons/WarningIcon";

const UpdateClientStatus: FunctionComponent<{
  clientId: number;
}> = (props) => {
  const { data, isLoading: isLoadingClientDetails } = useClientDetails(
    props.clientId
  );
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
  const { data: contracts, isLoading: isLoadingContracts } = useContractsList({
    status: "approved",
    client: props.clientId,
  });

  const cantUpdate = useMemo(() => {
    return (
      (contracts?.results.length > 0 && values.status === "Out Of Care") ||
      !contracts
    );
  }, [contracts, values.status]);
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
        {cantUpdate && !isLoadingContracts && !isLoadingClientDetails && (
          <div className="text-sm text-red p-2">
            <p>
              <WarningIcon className="inline-block" /> Er zijn nog{" "}
              {contracts?.results.length} contracten actief voor deze cliënt.
              Pas de status van deze contracten aan voordat u de status van de
              cliënt wijzigt.
            </p>
          </div>
        )}
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
