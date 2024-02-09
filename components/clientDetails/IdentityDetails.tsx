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
        <DetailCell label={"Identity"} value={data.identity ? "Verified" : "Not verified"} />
        <DetailCell label={"Bsn"} value={data.bsn} />
        <DetailCell label={"Source"} value={data.source} />
      </div>
    );
  }
};

export default IdentityDetails;
