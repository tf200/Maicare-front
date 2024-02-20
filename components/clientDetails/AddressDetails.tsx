"use client";

import React, { FunctionComponent } from "react";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";

type Props = {
  clientId: number;
};

const AddressDetails: FunctionComponent<Props> = ({ clientId }) => {
  const { data, isLoading, isError } = useClientDetails(clientId);
  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-red">We failed to load client address details</div>
    );
  if (data) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <DetailCell
          ignoreIfEmpty={true}
          label={"Stad"}
          value={data.city || "Not specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Postcode"}
          value={data.Zipcode || "Not specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Straatnaam"}
          value={data.streetname || "Not specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Huisnummer"}
          value={data.street_number || "Not specified"}
        />
      </div>
    );
  }
};

export default AddressDetails;
