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
  if (isError) return <div className="text-red-600">We failed to load client address details</div>;
  if (data) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <DetailCell
          ignoreIfEmpty={true}
          label={"Stad"}
          value={data.city || "Niet gespecificeerd"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Postcode"}
          value={data.Zipcode || "Niet gespecificeerd"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Straatnaam"}
          value={data.streetname || "Niet gespecificeerd"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Huisnummer"}
          value={data.street_number || "Niet gespecificeerd"}
        />
      </div>
    );
  }
};

export default AddressDetails;
