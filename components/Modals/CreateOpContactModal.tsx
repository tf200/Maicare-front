import React, { FunctionComponent } from "react";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import OpContactForm from "@/components/forms/OpContactForms/OpContactForm";

const CreateOpContactModal: FunctionComponent<ModalProps> = ({
  open,
  onClose,
  additionalProps,
}) => {
  return (
    <FormModal open={open} onClose={onClose} title={"Maak een nieuwe opdrachtgever aan"}>
      <OpContactForm
        mode={"add"}
        onSuccess={() => {
          onClose();
          additionalProps.onSuccess?.();
        }}
      />
    </FormModal>
  );
};

export default CreateOpContactModal;
