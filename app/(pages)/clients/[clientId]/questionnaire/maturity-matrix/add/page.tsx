"use client";
import DateTimePicker from "@/components/FormFields/DateTimePicker";
import InputField from "@/components/FormFields/InputField";
import Panel from "@/components/Panel";
import AdvancedMaturityMatrixField from "@/components/maturity_matrix/AdvancedMaturityMatrixField";
import { Formik, FormikProvider, useFormik } from "formik";

type AddMaturityMatrixPageProps = {
  params: {
    clientId: number;
  };
};

export default function AddMaturityMatrixPage({
  params: { clientId },
}: AddMaturityMatrixPageProps) {
  const formik = useFormik({
    initialValues: {
      start_date: "",
      end_date: "",
      maturity_matrix: [],
    },
    onSubmit: () => {
      console.log("submited");
    },
  });

  const { values, handleChange, handleBlur, touched, errors } = formik;

  return (
    <Panel title="Nieuwe volwassenheidsmatrix">
      <div className="p-5">
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-5">
              <InputField
                label={"Start datum"}
                name={"start_date"}
                type={"date"}
                className="lg:basis-1/2"
                required={true}
                value={values.start_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.start_date && errors.start_date}
              />
              <InputField
                label={"Eind datum"}
                name={"end_date"}
                type={"date"}
                className="lg:basis-1/2"
                required={true}
                value={values.end_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.end_date && errors.end_date}
              />
            </div>
            <AdvancedMaturityMatrixField clientId={clientId} name="maturity_matrix" />
          </form>
        </FormikProvider>
      </div>
    </Panel>
  );
}
