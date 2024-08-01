import React, { useState } from "react";
import InputField from "./FormFields/InputField";
import { useEmployeesList } from "@/utils/employees/getEmployeesList";

interface ComboBoxProps {
  setSelected: Function;
  data: any;
  isLoading: boolean;
  error?: string;
  setError?: Function;
  setSearchedKey: Function;
  label: string;
  placeholder: string;
  id?: string;
  className?: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  data,
  isLoading,
  error,
  setError,
  setSelected,
  setSearchedKey,
  label,
  placeholder,
  id,
  className,
}) => {
  let defaultValue = "A2b#4Cp$9q";
  const [value, setValue] = useState<string>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [canShowData, setCanSHowData] = useState<boolean>(true);

  if (value == defaultValue && canShowData == true) {
    setCanSHowData(false);
  }

  return (
    <div className={className}>
      <InputField
        id={id}
        className={"w-full mb-4.5"}
        label={label}
        name={"role"}
        required={true}
        type={"text"}
        placeholder={placeholder}
        onChange={(event) => {
          setCanSHowData(true);
          setSearchedKey(event.target.value);
          setSelected(null);
          setShowAlert(true);
          setValue(event.target.value == "" ? defaultValue : event.target.value);
        }}
        value={value == defaultValue ? "" : value}
        error={error}
        onBlur={() => {
          setTimeout(() => {
            setShowAlert(false);
          }, 600);
        }}
      />
      {canShowData &&
        (data && !isLoading ? (
          data?.results?.length == 0 ? (
            showAlert && (
              <ul className="1 border rounded-[4px] mb-4.5">
                <li className="w-ful p-3">No data</li>
              </ul>
            )
          ) : (
            showAlert && (
              <ul className="2 border rounded-[4px] mb-4.5">
                {data?.results?.map((item) => (
                  <li
                    className="w-ful cursor-pointer hover:text-white hover:bg-[#1C2434] p-3"
                    key={item.id}
                    onClick={() => {
                      setError("");
                      setValue(item.first_name + " " + item.last_name);
                      setSelected(item);
                      setShowAlert(false);
                    }}
                  >
                    {item.first_name + " " + item.last_name}
                  </li>
                ))}
              </ul>
            )
          )
        ) : (
          <ul className="3 border rounded-[4px] mb-4.5">
            <li className="w-ful p-3">Loading ...</li>
          </ul>
        ))}
    </div>
  );
};

export default ComboBox;
