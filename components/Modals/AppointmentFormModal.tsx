import React, { FunctionComponent, PropsWithChildren } from "react";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import AppointmentForm from "@/components/forms/AppointmentForm";

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
        {...additionalProps}
      />
    </FormModal>
  );
};

export default AppointmentFormModal;
