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

  return <div>Geen adresgegevens gevonden</div>;

};

export default AddressDetails;
