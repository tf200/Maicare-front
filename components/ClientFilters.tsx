import React, { FunctionComponent, useState } from "react";
import InputField from "@/components/FormFields/InputField";
import ControlledCheckboxGroup from "@/components/icons/ControlledCheckboxGroup";
import { SelectionOption } from "@/types/selection-option";
import { ClientsSearchParams } from "@/types/clients/clients-search-params";

const STATUS_OPTIONS: SelectionOption[] = [
  { value: "On Waiting List", label: "Wachtlijst" },
  { value: "In Care", label: "In Zorg" },
  { value: "Out Of Concern", label: "Uit Zorg" },
];

type Props = {
  onFiltersChange: (filters: ClientsSearchParams) => void;
};

const ClientFilters: FunctionComponent<Props> = ({ onFiltersChange }) => {
  const [selected, setSelected] = useState<SelectionOption["value"][]>([]);
  const [search, setSearch] = useState("");
  return (
    <div className="flex items-center gap-8">
      <InputField
        placeholder="Zoek Cliënten..."
        // placeholder="Search Clients ..."
        type="search"
        className="lg:min-w-75"
        onChange={(e) => {
          setSearch(e.target.value);
          onFiltersChange({
            search: e.target.value,
            status__in: selected.join(", "),
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
              search,
              status__in: selected.join(", "),
            });
          }}
        />
      </div>
    </div>
  );
};

export default ClientFilters;
