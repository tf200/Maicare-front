import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputFieldThin from "@/components/FormFields/InputFieldThin";
import Select from "@/components/FormFields/Select";
import { DIAGNOSIS_RELATION_OPTIONS } from "@/consts";
import Textarea from "@/components/FormFields/Textarea";

const NewDiagnostic: FunctionComponent = (props) => {
  return (
    <>
      <Breadcrumb pageName="New Emergency Contact" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create a New Emergency Contact
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <InputFieldThin
                    label={"First Name"}
                    required={true}
                    placeholder={"Enter First Name"}
                    type={"text"}
                    className="w-full xl:w-1/2"
                  />
                  <InputFieldThin
                    className={"w-full xl:w-1/2"}
                    label={"Last Name"}
                    required={true}
                    type={"text"}
                    placeholder={"Enter Last Name"}
                  />
                </div>
                <InputFieldThin
                  className={"w-full mb-4.5"}
                  required={true}
                  label={"Email address"}
                  type={"text"}
                  placeholder={"Enter email address"}
                />
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <InputFieldThin
                    label={"Phone number"}
                    required={true}
                    placeholder={"Enter phone number"}
                    type={"text"}
                    className="w-full xl:w-1/2"
                  />

                  <Select
                    label={"Relation"}
                    options={DIAGNOSIS_RELATION_OPTIONS}
                    className="w-full xl:w-1/2"
                    required={true}
                  />
                </div>

                <InputFieldThin
                  className={"w-full mb-4.5"}
                  required={true}
                  label={"Address physique"}
                  type={"text"}
                  placeholder={"Enter address physique"}
                />

                <button className="flex justify-center w-full p-3 font-medium rounded bg-primary text-gray">
                  Submit Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewDiagnostic;
