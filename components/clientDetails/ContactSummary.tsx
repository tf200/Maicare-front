"use client";

import React, { FunctionComponent } from "react";
import Loader from "@/components/common/Loader";
import api from "@/utils/api";
import { useQuery } from "react-query";
import { OpClientTypeRecord } from "@/components/forms/OpContactForms/OpContactForm";
import Button from "@/components/buttons/Button";
import { useModal } from "@/components/providers/ModalProvider";
import ContactModal from "@/components/Modals/ContactModal";
import DetailCell from "@/components/DetailCell";
import Panel from "@/components/Panel";
import PencilSquare from "@/components/icons/PencilSquare";
import { ContactResDto } from "@/types/op-contact/contact-res.dto";
import { useClientDetails } from "@/utils/clients/getClientDetails";

type Props = {
  clientId: number;
};

async function getClientContact(clientId: number) {
  const response = await api.get<ContactResDto>(`/client/senders/${clientId}/`);
  return response.data;
}

export const useClientContact = (clientId: number) => {
  return useQuery([clientId, "contact"], () => getClientContact(clientId));
};

const ContactSummaryPanel: FunctionComponent<Props> = ({ clientId }) => {
  const { open } = useModal(ContactModal);
  const { data, isLoading, isError } = useClientContact(clientId);
  const { data: clientData } = useClientDetails(clientId);
  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-red">
        Sorry! Het is ons niet gelukt om contactgegevens te laden
      </div>
    );
  if (clientData && !clientData.sender) {
    return (
      <Panel title={"Opdrachtgever"} containerClassName="px-7 py-4">
        <div className="flex flex-col gap-4 items-center">
          <div>Geen contactgegevens gevonden voor huidige cliënt!</div>
          <Button
            onClick={() => {
              open({ client: clientId });
            }}
          >
            Voeg contactgegevens toe
          </Button>
        </div>
      </Panel>
    );
  }
  return (
    <Panel
      title={"Opdrachtgever"}
      containerClassName="px-7 py-4"
      sideActions={
        <>
          {data && (
            <Button
              onClick={() => {
                open({
                  client: clientId,
                });
              }}
              className={"py-2 gap-2 flex items-center px-6"}
            >
              <PencilSquare className="w-5 h-5" />
              Voeg contact toe
            </Button>
          )}
        </>
      }
    >
      {data && <ContractsSummary data={data} />}
    </Panel>
  );
};

type ContractsSummaryProps = {
  data: ContactResDto;
};

const ContractsSummary: FunctionComponent<ContractsSummaryProps> = ({
  data,
}) => {
  return (
    <section className="grid grid-cols-3 gap-2">
      <DetailCell
        label={"Opdrachtgever"}
        value={OpClientTypeRecord[data.types]}
      />
      <DetailCell label={"Naam"} value={data.name} />
      <DetailCell label={"Adres"} value={data.address} />
      <DetailCell label={"Postcode"} value={data.postal_code} />
      <DetailCell label={"Plaats"} value={data.place} />
      <DetailCell
        label={"Telefoonnummer"}
        type={"phone"}
        value={data.phone_number}
      />
      <DetailCell label={"KvK nummer"} value={data.KVKnumber} />
      <DetailCell label={"BTW nummer"} value={data.BTWnumber} />
      <DetailCell label={"Cliëntnummer"} value={data.client_number} />
    </section>
  );
};

export default ContactSummaryPanel;
