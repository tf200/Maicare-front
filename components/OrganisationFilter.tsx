import ChevronDown from "@/components/icons/ChevronDown";
import clsx from "clsx";
import { useState } from "react";
import { EmployeesSearchParams } from "@/types/employees/employees-search-params";
import { useListRoles } from "@/utils/roles/list-roles";
import { useEmployeesList } from "@/utils/employees/getEmployeesList";
import { ORGANIGRAM_TRANSLATE } from "@/consts";

interface OrganisationFilterProps {
  onFiltersChange: Function;
  filters: EmployeesSearchParams;
}

const OrganisationFilter: React.FC<OrganisationFilterProps> = ({
  onFiltersChange,
  filters,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const { data, isLoading } = useListRoles();
  const { data: employeesData, isFetching: isFetchingEmployees } =
    useEmployeesList(filters);
  if (isLoading) return;
  return !selectedGroup ? (
    <>
      <div className="flex items-center">
        <ChevronDown
          className={clsx({
            "rotate-[-90deg]": !isOpen,
          })}
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-md font-bold my-1 hover:text-blue-600 focus:outline-none"
        >
          Mijn Zorg
        </button>
      </div>
      <FolderList
        setSelectedGroup={setSelectedGroup}
        filters={filters}
        onFiltersChange={onFiltersChange}
        folders={data ? data : []}
        isOpen={isOpen}
      />
    </>
  ) : (
    <div className="w-full flex flex-col items-end">
      <div>
        Team: {ORGANIGRAM_TRANSLATE[selectedGroup?.name]} (in dienst:{" "}
        {isLoading || isFetchingEmployees ? "" : employeesData?.count})
      </div>
      <button
        onClick={() => {
          onFiltersChange({
            groups: "",
            search: filters?.search,
            out_of_service: filters?.out_of_service,
          });
          setSelectedGroup(null);
        }}
        className="text-[#0000FF] cursor-pointer"
      >
        (organigram)
      </button>
    </div>
  );
};

const FolderList = ({
  folders,
  isOpen,
  setSelectedGroup,
  onFiltersChange,
  filters,
}) => {
  if (!isOpen) return null;
  if (!folders) return null;
  return (
    <ul className="bg-gray-100 p-4 pt-0 rounded-md w-64">
      {folders.map((group, index) => (
        <li className="flex">
          <button
            key={index}
            onClick={() => {
              onFiltersChange({
                groups: group.name,
                search: filters?.search,
                out_of_service: filters?.out_of_service,
              });
              setSelectedGroup(group);
            }}
            className="px-4 rounded hover:text-[#0000FF] cursor-pointer"
          >
            {ORGANIGRAM_TRANSLATE[group.name]}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default OrganisationFilter;
