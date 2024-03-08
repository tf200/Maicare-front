import React, { FunctionComponent, useMemo, useState } from "react";
import api from "@/utils/api";
import Button from "@/components/buttons/Button";
import InfoIcon from "@/components/icons/InfoIcon";
import FormModal from "@/components/Modals/FormModal";
import FormikCombobox from "@/components/FormFields/Combobox";
import CreateOpContactModal from "@/components/Modals/CreateOpContactModal";
import { FormikProvider, useFormik } from "formik";
import { ModalProps } from "@/types/modal-props";
import { useMutation, useQueryClient } from "react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { useModal } from "@/components/providers/ModalProvider";
import { useContacts } from "@/utils/contacts/getContactList";
import { ContactResDto } from "@/types/op-contact/contact-res.dto";

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
  const [query, setQuery] = useState<string>("");
  const debounceQuery = useDebounce(query, 300);
  const { data } = useContacts(debounceQuery);
  const { mutate: assign, isLoading } = usePatchClientContact(
    additionalProps.client
  );
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (value) => {
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
  const options = useMemo(() => {
    if (!data) return [];
    return data.results?.map((item) => ({
      value: item,
      label: item.name,
    }));
  }, [data]);
  const { open: openCreateModal } = useModal(CreateOpContactModal);
  return (
    <FormModal open={open} onClose={onClose} title={"Opdrachtgever Toevoegen"}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <FormikCombobox
            name="selected"
            className="mb-0"
            options={options}
            displayValue={(value) => value.name}
            handleQueryChange={(e) => {
              setQuery(e.target.value);
            }}
            label={"Opdrachtgever"}
            placeholder={"Selecteer een opdrachtgever"}
          />
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
