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
          label={"City"}
          value={data.city || "Not specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Zip code"}
          value={data.Zipcode || "Not specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Street Name"}
          value={data.streetname || "Not specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Street Number"}
          value={data.street_number || "Not specified"}
        />
      </div>
    );
  }
};

export default AddressDetails;
