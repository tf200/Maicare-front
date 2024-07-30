"use client";

import React, { FunctionComponent } from "react";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";
import ProfilePicture from "@/components/ProfilePicture";
import { mappingGender } from "@/utils/gender";
import dayjs from "dayjs";
import "dayjs/locale/en";
import IconButton from "@/components/buttons/IconButton";
import CameraIcon from "@/components/svg/CameraIcon";
import { ClientProfilePictureModal } from "@/components/Modals/ProfilePictureModal";
import { useModal } from "@/components/providers/ModalProvider";

type Props = {
  clientId: number;
};

const ClientInformation: FunctionComponent<Props> = ({ clientId }) => {
  const { data, isLoading, isError } = useClientDetails(clientId);
  const { open } = useModal(ClientProfilePictureModal);
  if (isLoading) return <Loader />;
  if (isError) return <div className="text-red-600">We failed to load client data</div>;
  if (data) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <div
            onClick={() => {
              open({
                id: clientId,
              });
            }}
            className="relative w-fit cursor-pointer"
          >
            <ProfilePicture profilePicture={data.profile_picture} />
            <IconButton className="p-[5px] absolute right-1 bottom-1">
              <CameraIcon className="w-3 h-3" />
            </IconButton>
          </div>
        </div>
        <DetailCell
          ignoreIfEmpty={true}
          label={"Volledige Naam"}
          value={`${data.first_name} ${data.last_name}` || "Niet gespecificeerd"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"E-mail"}
          type={"email"}
          value={data.email || "Niet gespecificeerd"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Telefoon"}
          type={"phone"}
          value={data.phone_number || "Niet gespecificeerd"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Geslacht"}
          value={mappingGender[data.gender] || "Niet gespecificeerd"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Geboortedatum"}
          value={
            data.date_of_birth
              ? dayjs(data.date_of_birth).format("DD MMM, YYYY")
              : "Niet gespecificeerd"
          }
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Geboorteplaats"}
          value={data.birthplace || "Niet gespecificeerd"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Dossiernummer"}
          value={data.filenumber || "Niet gespecificeerd"}
        />
      </div>
    );
  }
};

export default ClientInformation;
