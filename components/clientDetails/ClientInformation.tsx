"use client";

import React, { FunctionComponent } from "react";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";
import ProfilePicture from "@/components/ProfilePicture";
import dayjs from "dayjs";
import "dayjs/locale/en";

type Props = {
  clientId: number;
};

const ClientInformation: FunctionComponent<Props> = ({ clientId }) => {
  const { data, isLoading, isError } = useClientDetails(clientId);
  if (isLoading) return <Loader />;
  if (isError)
    return <div className="text-red">We failed to load client data</div>;
  if (data) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <ProfilePicture profilePicture={data.profile_picture} />
        </div>
        <DetailCell
          ignoreIfEmpty={true}
          label={"Volledige Naam"}
          value={`${data.first_name} ${data.last_name}` || "Not Specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"E-mail"}
          type={"email"}
          value={data.email || "Not Specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Telefoon"}
          type={"phone"}
          value={data.phone_number || "Not Specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Geslacht"}
          value={data.gender || "Not Specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Geboortedatum"}
          value={
            data.date_of_birth
              ? dayjs(data.date_of_birth).format("DD MMM, YYYY")
              : "Not Specified"
          }
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Geboorteplaats"}
          value={data.birthplace || "Not Specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Dossiernummer"}
          value={data.filenumber || "Not Specified"}
        />
      </div>
    );
  }
};

export default ClientInformation;
