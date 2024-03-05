"use client";

import React, { FunctionComponent } from "react";
import Loader from "@/components/common/Loader";
import api from "@/utils/api";
import { useQuery } from "react-query";
import { ContactResDto } from "@/components/FormFields/OpContactForms/OpContactForm";
import Button from "@/components/buttons/Button";
import { useModal } from "@/components/providers/ModalProvider";
import ContactModal from "@/components/Modals/ContactModal";

type Props = {
  clientId: number;
};

async function getClientContact(clientId: number) {
  const response = await api.get<ContactResDto>(`/clients/${clientId}/contact`);
  return response.data;
}

const useClientContact = (clientId: number) => {
  return useQuery([clientId, "contact"], () => getClientContact(clientId));
};

const ContractsSummary: FunctionComponent<Props> = ({ clientId }) => {
  const { data, isLoading, isError } = useClientContact(clientId);
  const { open } = useModal(ContactModal);
  // if (isLoading) return <Loader />;
  // if (isError)
  //   return (
  //     <div className="text-red">
  //       Sorry! Het is ons niet gelukt om contactgegevens te laden
  //     </div>
  //   );
  if (!data)
    return (
      <div className="flex flex-col gap-4 items-center">
        <div>Geen contactgegevens gevonden voor huidige cliënt!</div>
        <Button
          onClick={() => {
            open({ clientId });
          }}
        >
          Voeg contactgegevens toe
        </Button>
      </div>
    );
  return <section className="grid grid-cols-3 gap-2"></section>;
};

export default ContractsSummary;
