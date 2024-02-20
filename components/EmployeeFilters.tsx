import React, { FunctionComponent, useState } from "react";
import InputField from "@/components/FormFields/InputField";
import ControlledCheckboxGroup from "@/components/icons/ControlledCheckboxGroup";
import { SelectionOption } from "@/types/selection-option";
import { EmployeesSearchParams } from "@/types/employees/employees-search-params";

const STATUS_OPTIONS: SelectionOption[] = [
  { value: "out of service", label: "Uit Dienst" },
];

type Props = {
  onFiltersChange: (filters: EmployeesSearchParams) => void;
};

const EmployeeFilters: FunctionComponent<Props> = ({ onFiltersChange }) => {
  const [selected, setSelected] = useState<SelectionOption["value"][]>([]);
  const [search, setSearch] = useState("");
  return (
    <div className="flex items-center gap-8">
      <InputField
        placeholder="Zoek Medewerkers ..."
        type="search"
        className="lg:min-w-75"
        onChange={(e) => {
          setSearch(e.target.value);
          onFiltersChange({
            search: e.target.value,
            out_of_service: selected.length === 1,
          });
        }}
      />
      <div className="flex items-center gap-2">
        <ControlledCheckboxGroup
          options={STATUS_OPTIONS}
          selected={selected}
          onChange={(selected) => {
            setSelected(selected);
            onFiltersChange({
              search,
              out_of_service: selected.length === 1,
            });
          }}
        />
      </div>
    </div>
  );
};

export default EmployeeFilters;
