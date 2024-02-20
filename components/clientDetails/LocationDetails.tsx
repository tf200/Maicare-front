"use client";

import React, { FunctionComponent } from "react";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";

type Props = {
  clientId: number;
};

const LocationDetails: FunctionComponent<Props> = ({ clientId }) => {
  const { data, isLoading, isError } = useClientDetails(clientId);
  if (isLoading) return <Loader />;
  if (isError)
    return <div className="text-red">We failed to load client details</div>;
  if (data) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <DetailCell
          ignoreIfEmpty={true}
          label={"Locatie"}
          value={data.location || "Not specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Organisatie"}
          value={data.organisation || "Not specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Afdeling"}
          value={data.departement || "Not specified"}
        />
      </div>
    );
  }
};

export default LocationDetails;
