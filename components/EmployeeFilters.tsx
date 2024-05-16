import React, { FunctionComponent, useState } from "react";
import InputField from "@/components/FormFields/InputField";
import ControlledCheckboxGroup from "@/components/icons/ControlledCheckboxGroup";
import { SelectionOption } from "@/types/selection-option";
import { EmployeesSearchParams } from "@/types/employees/employees-search-params";
import { LocationSelect } from "@/components/FormFields/FormikLocation";

const STATUS_OPTIONS: SelectionOption[] = [
  { value: "out_of_service", label: "Uit Dienst" },
  // { value: "is_archived", label: "wordt gearchiveerd" },
];

type Props = {
  onFiltersChange: (filters: Partial<EmployeesSearchParams>) => void;
};

const EmployeeFilters: FunctionComponent<Props> = ({ onFiltersChange }) => {
  const [selected, setSelected] = useState<SelectionOption["value"][]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState<number>();


  return (
    <div className="flex flex-wrap items-center gap-8">
      <InputField
        placeholder="Zoek Medewerkers ..."
        type="search"
        className="lg:min-w-75"
        onChange={(e) => {
          setSearch(e.target.value);
          onFiltersChange({
            search: e.target.value,
            out_of_service: selected.includes("out_of_service"),
            location,
            is_archived: selected.includes("is_archived"),
          });
        }}
      />
      <LocationSelect
        label={"Locatie"}
        className={"lg:min-w-75 [&_label]:hidden"}
        onChange={(e) => {
          setLocation(+e.target.value || undefined);
          onFiltersChange({
            search,
            out_of_service: selected.includes("out_of_service"),
            location: +e.target.value || undefined,
            is_archived: selected.includes("is_archived"),
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
              out_of_service: selected.includes("out_of_service"),
              location,
              is_archived: selected.includes("is_archived"),
            });
          }}
        />
        
      </div>
    </div>
  );
};

export default EmployeeFilters;
