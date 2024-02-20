import React, { FunctionComponent, PropsWithChildren } from "react";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import AppointmentForm from "@/components/forms/AppointmentForm";

const AppointmentFormModal: FunctionComponent<
  PropsWithChildren<ModalProps>
> = ({ additionalProps, ...props }) => {
  return (
    <FormModal title="Maak een nieuwe afspraak" {...props}>
      <AppointmentForm
        initialData={{
          start_time: additionalProps.start,
          end_time: additionalProps.end,
        }}
        onSuccessfulSubmit={additionalProps.onSuccess}
      />
    </FormModal>
  );
};

export default AppointmentFormModal;
