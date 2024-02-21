import React, { FunctionComponent, PropsWithChildren } from "react";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import AppointmentForm from "@/components/forms/AppointmentForm";
import IconButton from "@/components/buttons/IconButton";
import TrashIcon from "@/components/icons/TrashIcon";

const AppointmentFormModal: FunctionComponent<
  PropsWithChildren<ModalProps>
> = ({ additionalProps, ...props }) => {
  return (
    <FormModal
      title={
        additionalProps?.mode === "edit"
          ? "Afspraak bewerken"
          : "Maak een nieuwe afspraak"
      }
      {...props}
    >
      <AppointmentForm
        onSuccessfulSubmit={additionalProps.onSuccess}
        onCancel={props.onClose}
        {...additionalProps}
      />
    </FormModal>
  );
};

export default AppointmentFormModal;
