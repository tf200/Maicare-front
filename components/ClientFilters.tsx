import React, { FunctionComponent, useState } from "react";
import InputFieldThin from "@/components/FormFields/InputFieldThin";
import ControlledCheckboxGroup from "@/components/icons/ControlledCheckboxGroup";
import { SelectionOption } from "@/types/selection-option";

const STATUS_OPTIONS: SelectionOption[] = [
  { value: "waitingList", label: "Waiting List" },
  { value: "inCare", label: "In Care" },
  { value: "outOfCare", label: "Out of Care" },
];

const ClientFilters: FunctionComponent = () => {
  const [selected, setSelected] = useState<SelectionOption["value"][]>([]);
  return (
    <div className="flex items-center gap-8">
      <InputFieldThin
        placeholder="Search Clients ..."
        type="search"
        className="lg:min-w-75"
      />
      <div className="flex items-center gap-2">
        <h2 className="uppercase text-sm font-bold mr-4">Client Status:</h2>
        <ControlledCheckboxGroup
          options={STATUS_OPTIONS}
          selected={selected}
          onChange={setSelected}
        />
      </div>
    </div>
  );
};

export default ClientFilters;
