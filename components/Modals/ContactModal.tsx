import api from "@/utils/api";
import { ModalProps } from "@/types/modal-props";
import Button from "@/components/buttons/Button";
import { FormikProvider, useFormik } from "formik";
import FormModal from "@/components/Modals/FormModal";
import { useContacts } from "@/components/ContactsList";
import FormikCombobox from "@/components/FormFields/Combobox";
import { ClientsResDto } from "@/types/clients/clients-res-dto";
import React, { FunctionComponent, useMemo, useState } from "react";
import { ContactResDto } from "@/components/FormFields/OpContactForms/OpContactForm";
import { useMutation, useQueryClient } from "react-query";
import { useDebounce } from "@/hooks/useDebounce";

type AssignClientContactReqDto = {
  client: ClientsResDto["id"];
  contact: ContactResDto["id"];
};

const assignClientContact = async (data: AssignClientContactReqDto) => {
  const response = await api.post("client/client-senders/", data);
  return response.data;
};

const useAssignClientContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignClientContact,
    onSuccess: (res: AssignClientContactReqDto) => {
      queryClient.invalidateQueries([res.client, "contact"]);
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
  const { mutate: assign } = useAssignClientContact();
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      assign({
        client: additionalProps.client,
        contact: values.selected,
      });
    },
  });
  const options = useMemo(() => {
    if (!data) return [];
    return data.results?.map((item) => ({
      value: item,
      label: item.name,
    }));
  }, [data]);
  return (
    <FormModal open={open} onClose={onClose} title={"Opdrachtgever Toevoegen"}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <FormikCombobox
            name="selected"
            className="mb-10"
            options={options}
            handleQueryChange={(e) => {
              setQuery(e.target.value);
            }}
            label={"Opdrachtgever"}
            placeholder={"Selecteer een opdrachtgever"}
          />
          <Button type="submit">Voeg toe</Button>
        </form>
      </FormikProvider>
    </FormModal>
  );
};

export default ContactModal;
