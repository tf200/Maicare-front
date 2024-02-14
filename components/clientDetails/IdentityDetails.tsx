"use client";

import React, { FunctionComponent } from "react";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";

type Props = {
  clientId: number;
};

const IdentityDetails: FunctionComponent<Props> = ({ clientId }) => {
  const { data, isLoading, isError } = useClientDetails(clientId);
  if (isLoading) return <Loader />;
  if (isError)
    return <div className="text-red">We failed to load client identity</div>;
  if (data) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <DetailCell ignoreIfEmpty={true} label={"Identity"} value={data.identity ? "Verified" : "Not verified"} />
        <DetailCell ignoreIfEmpty={true} label={"Bsn"} value={data.bsn || "Not Specified"} />
        <DetailCell ignoreIfEmpty={true} label={"Source"} value={data.source || "Not Specified"} />
      </div>
    );
  }
};

export default IdentityDetails;
