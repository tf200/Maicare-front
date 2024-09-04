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
import { TrashIcon } from "lucide-react";

export default function AppointmentCardEditPage({
  params: { clientId },
}: {
  params: { clientId: number };
}) {
  const { appointment, updateAppointment, isLoading, isError } = useClientAppointment(clientId);

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-red-600">Het is niet gelukt om de afspraakgegevens te laden</div>;

  // Transform appointment data to extract content for initial values
  const transformAppointmentData = (data) => {
    return data ? data.map((item) => item.content) : [];
  };

  return (
    <Formik
      initialValues={{
        general: transformAppointmentData(appointment.general),
        important_contacts: transformAppointmentData(appointment.important_contacts),
        household: transformAppointmentData(appointment.household),
        organization_agreements: transformAppointmentData(appointment.organization_agreements),
        probation_service_agreements: transformAppointmentData(
          appointment.probation_service_agreements
        ),
        appointments_regarding_treatment: transformAppointmentData(
          appointment.appointments_regarding_treatment
        ),
        school_stage: transformAppointmentData(appointment.school_stage),
        travel: transformAppointmentData(appointment.travel),
        leave: transformAppointmentData(appointment.leave),
      }}
      validationSchema={Yup.object({
        general: Yup.array().of(Yup.string().required("Verplicht")),
        important_contacts: Yup.array().of(Yup.string().required("Verplicht")),
        household: Yup.array().of(Yup.string().required("Verplicht")),
        organization_agreements: Yup.array().of(Yup.string().required("Verplicht")),
        probation_service_agreements: Yup.array().of(Yup.string().required("Verplicht")),
        appointments_regarding_treatment: Yup.array().of(Yup.string().required("Verplicht")),
        school_stage: Yup.array().of(Yup.string().required("Verplicht")),
        travel: Yup.array().of(Yup.string().required("Verplicht")),
        leave: Yup.array().of(Yup.string().required("Verplicht")),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        // Transform form values back to original structure
        const transformFormValues = (formValues) => {
          return formValues.map((content) => ({ content }));
        };

        const formattedValues = {
          general: transformFormValues(values.general),
          important_contacts: transformFormValues(values.important_contacts),
          household: transformFormValues(values.household),
          organization_agreements: transformFormValues(values.organization_agreements),
          probation_service_agreements: transformFormValues(values.probation_service_agreements),
          appointments_regarding_treatment: transformFormValues(
            values.appointments_regarding_treatment
          ),
          school_stage: transformFormValues(values.school_stage),
          travel: transformFormValues(values.travel),
          leave: transformFormValues(values.leave),
        };

        try {
          console.log("Formatted values", formattedValues);
          await updateAppointment(formattedValues);
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
                              values[key].map((content, index) => (
                                <tr key={index} className="border-b border-gray-300">
                                  <td className="p-2">
                                    <InputField
                                      name={`${key}.${index}`}
                                      type="text"
                                      value={content}
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
                                  Geen gegevens beschikbaar
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      <button
                        type="button"
                        className="mt-2 text-blue-700 bg-blue-100 dark:bg-gray-800 w-full py-1 px-4 rounded-lg"
                        onClick={() => push("")}
                      >
                        Item Toevoegen
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
