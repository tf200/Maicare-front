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
    return <div className="text-red">We failed to load client address details</div>;
  if (data) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <DetailCell label={"City"} value={data.city} />
        <DetailCell label={"Zip code"} value={data.Zipcode} />
        <DetailCell label={"Street Name"} value={data.streetname} />
        <DetailCell label={"Street Number"} value={data.street_number} />
      </div>
    );
  }
};

export default AddressDetails;
