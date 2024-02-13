import ChevronDown from "@/components/icons/ChevronDown";
import clsx from "clsx";
import { useState } from "react";

interface OrganisationFilterProps {
  folders: string[];
}

const OrganisationFilter: React.FC<OrganisationFilterProps> = ({ folders }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
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
          My Care
        </button>
      </div>
      <FolderList folders={folders} isOpen={isOpen} />
    </>
  );
};

const FolderList = ({ folders, isOpen }) => {
  if (!isOpen) return null;
  if (!folders) return null;
  return (
    <ul className="bg-gray-100 p-4 pt-0 rounded-md w-64">
      {folders.map((folder, index) => (
        <li
          key={index}
          className="px-4 rounded hover:bg-gray-200 cursor-pointer"
        >
          {folder}
        </li>
      ))}
    </ul>
  );
};

export default OrganisationFilter;
