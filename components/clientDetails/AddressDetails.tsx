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
  if (data.addresses.length > 0) {
    return (
      data.addresses.map((address, index) => (
      <div className="flex flex-col gap-2 mb-4">
        <h3 className="font-semibold text-gray-600">Adres #{index+1}</h3>
        <div className="grid grid-cols-2 gap-4">
          <DetailCell
            ignoreIfEmpty={true}
            label={"Behoort tot"}
            value={address.belongs_to || "Niet gespecificeerd"}
          />
          <DetailCell
            ignoreIfEmpty={true}
            label={"Postcode"}
            value={address.zip_code || "Niet gespecificeerd"}
          />
          <DetailCell
            ignoreIfEmpty={true}
            label={"Adres"}
            value={address.address || "Niet gespecificeerd"}
          />
          <DetailCell
            ignoreIfEmpty={true}
            label={"Stad"}
            value={address.city || "Niet gespecificeerd"}
          />
        </div>
      </div>
      ))
    );
  }else{
    return <div>Geen adresgegevens gevonden</div>;
  }
};

export default AddressDetails;
