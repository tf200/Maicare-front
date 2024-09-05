"use client";

import React from "react";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { useClientAppointment } from "@/hooks/useClientAppointment";
import Loader from "@/components/common/Loader";
import InputField from "@/components/FormFields/InputField";
import Panel from "@/components/Panel";
import { toast } from "react-toastify";

export default function AppointmentCardEditPage({
  params: { clientId },
}: {
  params: { clientId: number };
}) {
  const { appointment, updateAppointment, isLoading, isError } = useClientAppointment(clientId);

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-red-600">We failed to load appointment details</div>;

  return (
    <Formik
      initialValues={{
        general: (appointment.general || []).map(content => ({ content })),
        important_contacts: (appointment.important_contacts || []).map(content => ({ content })),
        household: (appointment.household || []).map(content => ({ content })),
        organization_agreements: (appointment.organization_agreements || []).map(content => ({ content })),
        probation_service_agreements: (appointment.probation_service_agreements || []).map(content => ({ content })),
        appointments_regarding_treatment: (appointment.appointments_regarding_treatment || []).map(content => ({ content })),
        school_stage: (appointment.school_stage || []).map(content => ({ content })),
        travel: (appointment.travel || []).map(content => ({ content })),
        leave: (appointment.leave || []).map(content => ({ content })),
      }}
      validationSchema={Yup.object({
        general: Yup.array().of(Yup.object({
          content: Yup.string().required("Required"),
        })),
        important_contacts: Yup.array().of(Yup.object({
          content: Yup.string().required("Required"),
        })),
        household: Yup.array().of(Yup.object({
          content: Yup.string().required("Required"),
        })),
        organization_agreements: Yup.array().of(Yup.object({
          content: Yup.string().required("Required"),
        })),
        probation_service_agreements: Yup.array().of(Yup.object({
          content: Yup.string().required("Required"),
        })),
        appointments_regarding_treatment: Yup.array().of(Yup.object({
          content: Yup.string().required("Required"),
        })),
        school_stage: Yup.array().of(Yup.object({
          content: Yup.string().required("Required"),
        })),
        travel: Yup.array().of(Yup.object({
          content: Yup.string().required("Required"),
        })),
        leave: Yup.array().of(Yup.object({
          content: Yup.string().required("Required"),
        })),
      })}
      onSubmit={async (values, { setSubmitting }) => {
       
        
        try {
          console.log("Formatted values", values);
          await updateAppointment(values);
          toast.success("Appointment details updated successfully");
        } catch (error) {
          console.error("Failed to update appointment details", error);
          toast.error("Failed to update appointment details: " + error, { autoClose: 5000 });
        }
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, errors, touched, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Panel title={"Afspraak Bewerken"}>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {Object.keys(values).map((key) => (
                <FieldArray key={key} name={key}>
                  {({ push, remove }) => (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-600 capitalize">
                        {key.replace("_", " ")}
                      </h3>
                      {values[key].length === 0 ? (
                        <div className="text-gray-500 italic">
                          No items available for {key.replace("_", " ")}.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {values[key].map((item, index) => (
                            <div key={index} className="flex flex-col">
                              <InputField
                                label={`Item ${index + 1}`}
                                name={`${key}.${index}.content`}
                                type="text"
                                value={item.content}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched[key]?.[index]?.content && errors[key]?.[index]?.content}
                                className="mb-2"
                              />
                              <button
                                type="button"
                                className="text-red-500 text-sm mt-1 self-end"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <button
                        type="button"
                        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        onClick={() => push({ content: "" })}
                      >
                        Add Item
                      </button>
                    </div>
                  )}
                </FieldArray>
              ))}
            </div>
          </Panel>
          <button
            type="submit"
            className="my-4 bg-blue-700 text-white py-2 px-4 rounded-lg float-right"
          >
            Save Changes
          </button>
        </form>
      )}
    </Formik>
  );
}
