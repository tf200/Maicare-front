import React, { FunctionComponent, useMemo, useState } from "react";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import Combobox from "@/components/FormFields/Combobox";
import { useClientsList } from "@/utils/clients/getClientsList";
import { ClientsSearchParams } from "@/types/clients/clients-search-params";
import { FormikProvider, useFormik } from "formik";
import Button from "@/components/buttons/Button";

const initialValues = {
  client: "",
};

const ClientSelectModal: FunctionComponent<ModalProps> = ({
  open,
  onClose,
  additionalProps,
}) => {
  const [filter, setFilter] = useState<ClientsSearchParams>({
    search: "",
    status__in: "",
  });
  const { data } = useClientsList(filter);
  const options = useMemo(() => {
    if (!data) {
      return [];
    }
    return data?.results.map((client) => ({
      label: client.first_name + " " + client.last_name,
      value: client,
    }));
  }, [data]);
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      onClose();
      additionalProps?.onSelect?.(formik.values.client);
    },
  });
  return (
    <FormModal
      panelClassName={"min-h-100"}
      open={open}
      onClose={onClose}
      title={"Selecteer een klant"}
    >
      <FormikProvider value={formik}>
        <form className="flex flex-col grow" onSubmit={formik.handleSubmit}>
          <Combobox
            name="client"
            className={"mb-5"}
            placeholder={"Zoek klant..."}
            options={options}
            displayValue={(value) => value.first_name + " " + value.last_name}
            handleQueryChange={(e) => {
              const search = e.target.value;
              setFilter({ ...filter, search });
            }}
            label={"Klant"}
          />
          <Button className="mt-auto" type={"submit"} formNoValidate={false}>
            Selecteer klant
          </Button>
        </form>
      </FormikProvider>
    </FormModal>
  );
};

export default ClientSelectModal;
