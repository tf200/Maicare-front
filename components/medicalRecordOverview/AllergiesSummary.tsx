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
  const { data, isLoading, isError } = useAllergiesList(clientId, {
    page: 1,
    page_size: count || 5,
  });
  if (isLoading) return <Loader />;
  if (isError)
    return <div className="text-red-600">Een fout heeft ons verhinderd gegevens te laden.</div>;
  if (!data) return <div>Geen gegevens opgehaald.</div>;
  if (data.results?.length === 0) return <div>Geen geregistreerde allergie voor cliënt</div>;
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
    <li className="grid grid-cols-3 px-4 py-4 cursor-pointer hover:bg-gray-3 dark:hover:bg-slate-700 rounded-2xl">
      <div>{allergy.allergy_type}</div>
      <div className="flex items-center justify-center">
        <Severity severity={allergy.severity} />
      </div>
      <div>{allergy.reaction}</div>
    </li>
  );
};
