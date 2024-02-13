import React, { FunctionComponent, useState } from "react";
import InputFieldThin from "@/components/FormFields/InputFieldThin";
import ControlledCheckboxGroup from "@/components/icons/ControlledCheckboxGroup";
import { SelectionOption } from "@/types/selection-option";
import { EmployeesSearchParams } from "@/types/employees/employees-search-params";

const STATUS_OPTIONS: SelectionOption[] = [
  { value: "On Waiting List", label: "Waiting List" },
  { value: "In Care", label: "In Care" },
  { value: "Out Of Concern", label: "Out of Care" },
];

type Props = {
  onFiltersChange: (filters: EmployeesSearchParams) => void;
};

const EmployeeFilters: FunctionComponent<Props> = ({ onFiltersChange }) => {
  const [selected, setSelected] = useState<SelectionOption["value"][]>([]);
  const [search, setSearch] = useState("");
  return (
    <div className="flex items-center gap-8">
      <InputFieldThin
        placeholder="Search Employees ..."
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
        <h2 className="uppercase text-sm font-bold mr-4">Employee Status:</h2>
        {/* <ControlledCheckboxGroup
          options={STATUS_OPTIONS}
          selected={selected}
          onChange={(selected) => {
            setSelected(selected);
            onFiltersChange({
              search,
              status__in: selected.join(", "),
            });
          }}
        /> */}
      </div>
    </div>
  );
};

export default EmployeeFilters;
