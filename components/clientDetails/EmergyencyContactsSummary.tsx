"use client";

import React, { FunctionComponent } from "react";
import { useEmergencyContacts } from "@/utils/emergency/getEmergencyContacts";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";
import { useRouter } from "next/navigation";

type Props = {
  clientId: number;
};

const EmergencyContactsSummary: FunctionComponent<Props> = ({ clientId }) => {
  const { data, isLoading } = useEmergencyContacts(clientId);
  const router = useRouter();
  if (isLoading) return <Loader />;
  if (!data) return <div>Geen gegevens opgehaald.</div>;
  if (data.results?.length === 0) return <div>Geen noodcontacten gevonden</div>;
  return (
    <ul className="flex flex-col gap-2">
      {data.results?.map((contact) => {
        return (
          <li
            key={contact.id}
            onClick={() =>
              router.push(`/clients/${clientId}/emergency/${contact.id}`)
            }
            className="grid grid-cols-2 hover:bg-gray-3 p-2 cursor-pointer rounded-xl"
          >
            <DetailCell
              ignoreIfEmpty={true}
              label={contact.first_name + " " + contact.last_name}
              value={contact.relationship}
            />
            <DetailCell
              label={
                <a href={"mailto:" + contact.email} className="block">
                  <span className="text-primary">{contact.email}</span>
                </a>
              }
              value={
                <a href={"tel:" + contact.phone_number} className="block">
                  <span className="text-primary">{contact.phone_number}</span>
                </a>
              }
            />
          </li>
        );
      })}
    </ul>
  );
};

export default EmergencyContactsSummary;
