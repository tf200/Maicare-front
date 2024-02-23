import React, { FunctionComponent, PropsWithChildren } from "react";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import AppointmentForm from "@/components/forms/AppointmentForm";
import api from "@/utils/api";
import { AppointmentResDto } from "@/types/appointments/appointment-res-dto";
import { useQuery } from "react-query";

async function getAppointmentDetails(id: number) {
  const response = await api.get<AppointmentResDto>(`/appointments/rud/${id}/`);
  return response.data;
}

const useAppointmentDetails = (id: number) => {
  return useQuery({
    queryKey: ["appointment", id],
    queryFn: () => getAppointmentDetails(id),
    enabled: !!id,
  });
};

const AppointmentFormModal: FunctionComponent<
  PropsWithChildren<ModalProps>
> = ({ additionalProps, ...props }) => {
  const { data, isLoading } = useAppointmentDetails(additionalProps?.id);

  const canUpdate = data && additionalProps?.mode === "edit";
  return (
    <FormModal
      title={
        additionalProps?.mode === "edit"
          ? "Afspraak bewerken"
          : "Maak een nieuwe afspraak"
      }
      {...props}
    >
      {additionalProps?.mode === "create" ||
        (canUpdate && (
          <AppointmentForm
            onSuccessfulSubmit={additionalProps.onSuccess}
            onCancel={props.onClose}
            {...additionalProps}
            initialData={data}
          />
        ))}
    </FormModal>
  );
};

export default AppointmentFormModal;
