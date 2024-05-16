import React, { FunctionComponent } from "react";
import api from "@/utils/api";
import Button from "@/components/buttons/Button";
import InfoIcon from "@/components/icons/InfoIcon";
import FormModal from "@/components/Modals/FormModal";
import CreateOpContactModal from "@/components/Modals/CreateOpContactModal";
import { FormikProvider, useFormik } from "formik";
import { ModalProps } from "@/types/modal-props";
import { useMutation, useQueryClient } from "react-query";
import { useModal } from "@/components/providers/ModalProvider";
import { ContactResDto } from "@/types/op-contact/contact-res.dto";
import ContactSelector from "@/components/FormFields/comboboxes/ContactSelector";

type AssignClientContactReqDto = {
  sender: ContactResDto["id"];
};

const patchClientContact = async (
  clientId: number,
  data: AssignClientContactReqDto
) => {
  const response = await api.patch(`/client/client_update/${clientId}/`, data);
  return response.data;
};

const usePatchClientContact = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: AssignClientContactReqDto) =>
      patchClientContact(clientId, req),
    onSuccess: () => {
      queryClient.invalidateQueries([clientId]);
      queryClient.invalidateQueries(["clients", clientId]);
    },
  });
};

type AssignmentFormType = {
  selected: ContactResDto["id"];
};

const initialValues: AssignmentFormType = {
  selected: null,
};

const ContactModal: FunctionComponent<ModalProps> = ({
  open,
  onClose,
  additionalProps,
}) => {
  const { mutate: assign, isLoading } = usePatchClientContact(
    additionalProps.clientId || additionalProps.client
  );

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (value) => {

      console.log("Sender Value:", value)

      assign(
        {
          sender: value.selected,
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    },
  });
  const { open: openCreateModal } = useModal(CreateOpContactModal);
  return (
    <FormModal
      panelClassName={"min-h-100"}
      open={open}
      onClose={onClose}
      title={"Opdrachtgever Toevoegen"}
    >
      <FormikProvider value={formik}>
        <form className="grow flex flex-col" onSubmit={formik.handleSubmit}>
          <ContactSelector name={"selected"} />
          <button
            onClick={() => {
              openCreateModal({});
            }}
            className="flex items-baseline gap-1 font-bold mb-10"
          >
            <InfoIcon className="w-5 h-5 relative bottom-[-0.3rem]" />
            <div className="text-sm text-gray-400">
              Wil je een nieuwe opdrachtgever aanmaken?
            </div>
          </button>
          <Button isLoading={isLoading} type="submit" className="mt-auto">
            Voeg toe
          </Button>
        </form>
      </FormikProvider>
    </FormModal>
  );
};

export default ContactModal;
