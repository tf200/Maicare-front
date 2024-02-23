import React, { FunctionComponent, PropsWithChildren, useMemo } from "react";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import AppointmentForm, {
  AppointmentFormProps,
} from "@/components/forms/AppointmentForm";
import { useAppointmentDetails } from "@/utils/appointments/getAppointmentDetails";

type Props = ModalProps & {
  additionalProps?: AppointmentFormProps;
};

const AppointmentFormModal: FunctionComponent<PropsWithChildren<Props>> = ({
  additionalProps,
  ...props
}) => {
  const { data, isLoading } = useAppointmentDetails(additionalProps?.id);

  const canUpdate = data && additionalProps?.mode === "edit";
  const formProps: AppointmentFormProps = useMemo(() => {
    return additionalProps.mode === "edit"
      ? {
          initialData: data,
          mode: "edit",
          onSuccessfulSubmit: additionalProps.onSuccess,
          onCancel: props.onClose,
        }
      : {
          initialSlot: additionalProps.initialSlot,
          mode: "create",
          onSuccessfulSubmit: additionalProps.onSuccess,
          onCancel: props.onClose,
        };
  }, [data]);
  return (
    <FormModal
      title={
        additionalProps?.mode === "edit"
          ? "Afspraak bewerken"
          : "Maak een nieuwe afspraak"
      }
      {...props}
    >
      {(additionalProps?.mode === "create" || canUpdate) && (
        <AppointmentForm {...formProps} />
      )}
    </FormModal>
  );
};

export default AppointmentFormModal;
