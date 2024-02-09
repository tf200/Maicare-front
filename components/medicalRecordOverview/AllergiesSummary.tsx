"use client";

import React, { FunctionComponent } from "react";
import Loader from "@/components/common/Loader";
import Severity from "@/components/Severity";
import { useAllergiesList } from "@/utils/allergies/getAllergiesList";
import { AllergiesResDto } from "@/types/allergies/allergies-res-dto";

type Props = {
  clientId: number;
  count?: number;
};

const AllergiesSummary: FunctionComponent<Props> = ({ clientId, count }) => {
  const { data, isLoading } = useAllergiesList(clientId, {
    page: 1,
    page_size: count || 5,
  });
  if (isLoading) return <Loader />;
  if (data.results?.length === 0)
    return <div>No recorded allergy for client</div>;
  return (
    <ul className="flex flex-col gap-2">
      {data.results?.map((allergy) => {
        return <AllergyItem key={allergy.id} allergy={allergy} />;
      })}
    </ul>
  );
};

export default AllergiesSummary;

type AllergyItemProps = {
  allergy: AllergiesResDto;
};

const AllergyItem: FunctionComponent<AllergyItemProps> = ({ allergy }) => {
  return (
    <li className="grid grid-cols-3 px-4 py-2 cursor-pointer hover:bg-gray-3 rounded-2xl">
      <div>{allergy.allergy_type}</div>
      <div className="flex items-center justify-center">
        <Severity severity={allergy.severity} />
      </div>
      <div>{allergy.reaction}</div>
    </li>
  );
};
