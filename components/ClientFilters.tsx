import React, { FunctionComponent, useState } from "react";
import InputField from "@/components/FormFields/InputField";
import ControlledCheckboxGroup from "@/components/icons/ControlledCheckboxGroup";
import { SelectionOption } from "@/types/selection-option";
import { ClientsSearchParams } from "@/types/clients/clients-search-params";
import FormikLocation, { LocationSelect } from "@/components/FormFields/FormikLocation";
import { STATUS_OPTIONS } from "@/consts";

type Props = {
  onFiltersChange: (filters: ClientsSearchParams) => void;
  search: string;
  location: number;
  status: string[];
};

const ClientFilters: FunctionComponent<Props> = ({ onFiltersChange, search, location, status}) => {
  const [selected, setSelected] = useState<SelectionOption["value"][]>(status || []);
  return (
    <div className="flex flex-wrap items-center gap-8">
      <InputField
        placeholder="Zoek Cliënten..."
        // placeholder="Search Clients ..."
        type="search"
        className="lg:min-w-75"
        value={search}
        onChange={(e) => {
          onFiltersChange({
            search: e.target.value,
          });
        }}
      />
      <LocationSelect
        label={"Locatie"}
        className={"lg:min-w-75 [&_label]:hidden"}
        value={location}
        onChange={(e) => {
          onFiltersChange({
            location: +e.target.value || undefined,
          });
        }}
      />
      <div className="flex items-center gap-2">
        <h2 className="uppercase text-sm font-bold mr-4">CLIËNTSTATUS:</h2>
        {/* Client Status: */}
        <ControlledCheckboxGroup
          options={STATUS_OPTIONS}
          selected={selected}
          onChange={(selected) => {
            setSelected(selected);
            onFiltersChange({
              status__in: selected.join(", "),
            });
          }}
        />
      </div>
    </div>
  );
};

export default ClientFilters;
