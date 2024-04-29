import React, { FunctionComponent } from "react";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import { FormikProvider, useFormik } from "formik";
import Button from "@/components/buttons/Button";
import ClientSelector from "@/components/FormFields/comboboxes/ClientSelector";

const initialValues = {
  client: "",
};

const ClientSelectModal: FunctionComponent<ModalProps> = ({
  open,
  onClose,
  additionalProps,
}) => {
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
      title={"Selecteer een Cliënt"}
    >
      <FormikProvider value={formik}>
        <form className="flex flex-col grow" onSubmit={formik.handleSubmit}>
          <ClientSelector name="client" className="mb-5" />
          <Button className="mt-auto" type={"submit"} formNoValidate={false}>
            Selecteer Cliënt
          </Button>
        </form>
      </FormikProvider>
    </FormModal>
  );
};

export default ClientSelectModal;
