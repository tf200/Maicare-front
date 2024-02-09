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
          label={"Full Name"}
          value={`${data.first_name} ${data.last_name}`}
        />
        <DetailCell label={"Email"} type={"email"} value={data.email} />
        <DetailCell label={"Phone"} type={"phone"} value={data.phone_number} />
        <DetailCell label={"Gender"} value={data.gender} />
        <DetailCell
          label={"Date of birth"}
          value={dayjs(data.date_of_birth).format("DD MMM, YYYY")}
        />
        <DetailCell label={"Birth Place"} value={data.birthplace} />
        <DetailCell label={"File Number"} value={data.filenumber} />
      </div>
    );
  }
};

export default ClientInformation;
