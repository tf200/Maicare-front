"use client";

import React, { FunctionComponent } from "react";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";
import ProfilePicturePlaceholder from "@/components/icons/ProfilePicturePlaceholder";
import ProfilePicture from "@/components/ProfilePicture";

type Props = {
  clientId: string;
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
          label={"Name"}
          value={`${data.first_name} ${data.last_name}`}
        />
        <DetailCell label={"Email"} type={"email"} value={data.email} />
        <DetailCell label={"Phone"} type={"phone"} value={data.phone_number} />
        <DetailCell label={"Organisation"} value={data.organisation} />
        <DetailCell label={"Location"} value={data.location} />
        <DetailCell label={"Department"} value={data.departement} />
        <DetailCell label={"Gender"} value={data.gender} />
        <DetailCell label={"File Number"} value={data.filenumber} />
      </div>
    );
  }
};

export default ClientInformation;
