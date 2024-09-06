"use client";


import React from "react";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { useClientAppointment } from "@/hooks/useClientAppointment";
import Loader from "@/components/common/Loader";
import InputField from "@/components/FormFields/InputField";
import Panel from "@/components/Panel";
import { toast } from "react-toastify";
import IconButton from "@/components/buttons/IconButton";
import { Plus, TrashIcon } from "lucide-react";

export default function AppointmentCardEditPage({
  params: { clientId },
}: {
  params: { clientId: number };
}) {
  const { appointment, updateAppointment, isLoading, isError } = useClientAppointment(clientId);

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-red-600">Het is niet gelukt om de afspraakgegevens te laden</div>;

  return (
    <Formik
      initialValues={appointment}
      validationSchema={Yup.object({
        general: Yup.array().of(Yup.object({ content: Yup.string().required('Verplicht')}).required("Verplicht")),
        important_contacts: Yup.array().of(Yup.object({ content: Yup.string().required('Verplicht')}).required("Verplicht")),
        household: Yup.array().of(Yup.object({ content: Yup.string().required('Verplicht')}).required("Verplicht")),
        organization_agreements: Yup.array().of(Yup.object({ content: Yup.string().required('Verplicht')}).required("Verplicht")),
        probation_service_agreements: Yup.array().of(Yup.object({ content: Yup.string().required('Verplicht')}).required("Verplicht")),
        appointments_regarding_treatment: Yup.array().of(Yup.object({ content: Yup.string().required('Verplicht')}).required("Verplicht")),
        school_stage: Yup.array().of(Yup.object({ content: Yup.string().required('Verplicht')}).required("Verplicht")),
        travel: Yup.array().of(Yup.object({ content: Yup.string().required('Verplicht')}).required("Verplicht")),
        leave: Yup.array().of(Yup.object({ content: Yup.string().required('Verplicht')}).required("Verplicht")),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        // Transform form values back to original structure
        const transformFormValues = (formValues) => {
          return formValues.map((content) => ({ content }));
        };
        console.log("Values", values);

        try {
          console.log("Formatted values", values);
          await updateAppointment(values);
          toast.success("Afspraakdetails succesvol bijgewerkt");
        } catch (error) {
          console.error("Het is niet gelukt om de afspraakdetails bij te werken", error);
          toast.error("Het is niet gelukt om de afspraakdetails bij te werken: " + error, { autoClose: 5000 });
        }
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, errors, touched, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Panel
            title={"Afspraak Bewerken"}
            sideActions={
              <button
                type="submit"
                className="my-4 bg-blue-700 text-white py-2 px-4 rounded-lg float-right"
              >
                Wijzigingen Opslaan
              </button>
            }
          >
            <div className="w-full gap-4 p-4">
              {Object.keys(values).map((key) => (
                <FieldArray key={key} name={key}>
                  {({ push, remove }) => (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-600 capitalize">
                        {key.replace("_", " ")}
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300">
                          <tbody>
                            {values[key].length > 0 ? (
                              values[key].map((item, index) => (
                                <tr key={index} className="border-b border-gray-300">
                                  <td className="p-2">
                                    <InputField
                                      name={`${key}.${index}`}
                                      type="text"
                                      value={item?.content}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      error={touched[key]?.[index] && errors[key]?.[index]}
                                      className="w-full border-none focus:ring-0 focus:border-transparent"
                                    />
                                  </td>
                                  <td className="px-4 w-20 text-right">
                                    <IconButton buttonType="Danger" onClick={() => remove(index)}>
                                      <TrashIcon className="w-5 h-5" />
                                    </IconButton>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr className="border-b border-gray-300">
                                <td className="p-2 text-gray-500" colSpan={2}>
                                  -
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      <button
                        type="button"
                        className="mt-2 text-blue-700 bg-blue-100 dark:bg-gray-800 w-full py-1 px-4 rounded-lg flex justify-center items-center content-center gap-1"
                        onClick={() => push("")}
                      >
                       <Plus size={18}/> <span>Item Toevoegen</span>
                      </button>
                    </div>
                  )}
                </FieldArray>
              ))}
            </div>
          </Panel>
        </form>
      )}
    </Formik>
  );
}
