import React, { FunctionComponent } from "react";
import { useFormikContext, FieldArray } from "formik";
import InputField from "./InputField";
import { ClientFormType } from "@/types/clients/client-form-type";

const FormikAddresses: FunctionComponent<{ className?: string; required?: boolean }> = ({
  className,
  required,
}) => {
  const { values, touched, errors, handleChange, handleBlur } = useFormikContext<ClientFormType>();

  return (
    <FieldArray name="addresses">
      {({ push, remove }) => (
        <div className={className}>
          {values.addresses.map((address, index) => (
            <div key={index} className="mb-6">
              <InputField
                label={"Behoort Tot"}
                id={`addresses.${index}.belongs_to`}
                name={`addresses.${index}.belongs_to`}
                placeholder={"bijv. moeder, broer"}
                type={"text"}
                className="w-full mb-4.5"
                value={address.belongs_to}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.addresses?.[index]?.belongs_to}
              />

              <InputField
                label={"Adres"}
                id={`addresses.${index}.address`}
                name={`addresses.${index}.address`}
                placeholder={"Adres"}
                type={"text"}
                className="w-full mb-4.5"
                value={address.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.addresses?.[index]?.address}
              />

              <InputField
                label={"Stad"}
                id={`addresses.${index}.city`}
                name={`addresses.${index}.city`}
                placeholder={"Stad"}
                type={"text"}
                className="w-full mb-4.5"
                value={address.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.addresses?.[index]?.city}
              />

              <InputField
                label={"Postcode"}
                id={`addresses.${index}.zip_code`}
                name={`addresses.${index}.zip_code`}
                placeholder={"Postcode"}
                type={"text"}
                className="w-full mb-4.5"
                value={address.zip_code}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.addresses?.[index]?.zip_code}
              />

              <InputField
                label={"Telefoonnummer"}
                id={`addresses.${index}.phone_number`}
                name={`addresses.${index}.phone_number`}
                placeholder={"Telefoonnummer"}
                type={"text"}
                className="w-full mb-4.5"
                value={address.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.addresses?.[index]?.phone_number}
              />

              <button
                type="button"
                className="text-red-500 m-2 w-full text-center "
                onClick={() => remove(index)}
              >
                Verwijder Adres
              </button>
              <hr className="m-2" />
            </div>
          ))}

          <button
            type="button"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
            onClick={() => {
              push({
                belongs_to: "",
                address: "",
                city: "",
                zip_code: "",
                phone_number: "",
              });
            }}
          >
            Voeg Adres Toe
          </button>
        </div>
      )}
    </FieldArray>
  );
};

export default FormikAddresses;
