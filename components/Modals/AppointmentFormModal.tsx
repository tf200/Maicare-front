import React, { FunctionComponent, PropsWithChildren } from "react";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import AppointmentForm from "@/components/forms/AppointmentForm";

const AppointmentFormModal: FunctionComponent<
  PropsWithChildren<ModalProps>
> = ({ callbacks, ...props }) => {
  return (
    <FormModal title="Maak een nieuwe afspraak" {...props}>
      <AppointmentForm onSuccessfulSubmit={callbacks.onSuccess} />
    </FormModal>
  );
};

export default AppointmentFormModal;
