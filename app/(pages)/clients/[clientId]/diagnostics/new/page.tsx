import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputFieldThin from "@/components/FormFields/InputFieldThin";
import Select from "@/components/FormFields/Select";
import { DIAGNOSIS_SEVERITY_OPTIONS } from "@/consts";
import Textarea from "@/components/FormFields/Textarea";

const NewDiagnostic: FunctionComponent = (props) => {
  return (
    <>
      <Breadcrumb pageName="New Diagnostic" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create a New Diagnostic
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <InputFieldThin
                  className={"w-full mb-4.5"}
                  required={true}
                  label={"Diagnosis summary"}
                  type={"text"}
                  placeholder={"Enter summary of the diagnosis"}
                />
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <InputFieldThin
                    label={"Condition"}
                    required={true}
                    placeholder={"Enter Condition of the patient"}
                    type={"text"}
                    className="w-full xl:w-1/2"
                  />
                  <InputFieldThin
                    className={"w-full xl:w-1/2"}
                    required={true}
                    label={"ICD Code"}
                    type={"text"}
                    placeholder={"Enter ICD Code of the diagnosis"}
                  />
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <Select
                    label={"Severity"}
                    options={DIAGNOSIS_SEVERITY_OPTIONS}
                    className="w-full xl:w-1/2"
                    required={true}
                  />
                </div>

                <Textarea
                  rows={6}
                  className={"mb-6"}
                  label={"Diagnosis Notes"}
                  placeholder={"Provide notes for the diagnosis"}
                  required={true}
                />

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Submit Diagnostic
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
