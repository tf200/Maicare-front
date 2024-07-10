"use client";
import DateTimePicker from "@/components/FormFields/DateTimePicker";
import InputField from "@/components/FormFields/InputField";
import Panel from "@/components/Panel";
import Button from "@/components/buttons/Button";
import AdvancedMaturityMatrixField from "@/components/maturity_matrix/AdvancedMaturityMatrixField";
import { MaturityMatrixPayload, useCreateMaturityMatrix } from "@/utils/domains";
import axios from "axios";
import { Formik, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

type AddMaturityMatrixPageProps = {
  params: {
    clientId: number;
  };
};

export default function AddMaturityMatrixPage({
  params: { clientId },
}: AddMaturityMatrixPageProps) {
  const router = useRouter();

  const {
    mutate: createMaturityMatrix,
    isLoading: isCreating,
    isError,
    error,
  } = useCreateMaturityMatrix();

  const formik = useFormik<MaturityMatrixPayload>({
    initialValues: {
      client_id: clientId,
      start_date: "",
      end_date: "",
      maturity_matrix: [],
    },
    validationSchema: Yup.object({
      start_date: Yup.string().required("Start date is required"),
      end_date: Yup.string().required("End date is required"),
      maturity_matrix: Yup.array().min(1, "Please select a domain to work on!").required(),
    }),
    onSubmit: (values) => {
      createMaturityMatrix(values, {
        onSuccess() {
          toast.success("Maturity matrix created successfully!");
          router.push(`/clients/${clientId}/questionnaire/maturity-matrix`);
        },
      });
    },
  });

  const { values, handleChange, handleBlur, touched, errors } = formik;

  if (isError && axios.isAxiosError(error)) {
    toast.error(error.message);
  }

  // Show formik errors
  if (formik.errors) {
    // Object.keys(formik.errors).forEach((key) => {
    //   toast.error(formik.errors[key]);
    // });
    console.log(formik.errors);
  }

  return (
    <Panel
      title="Nieuwe volwassenheidsmatrix"
      sideActions={
        <Button
          onClick={() => formik.handleSubmit()}
          type="button"
          form="add-maturity-matrix-form"
          className="btn btn-primary"
        >
          {isCreating ? "Opslaan..." : "Opslaan"}
        </Button>
      }
    >
      <div className="p-5">
        <FormikProvider value={formik}>
          <form onSubmit={(e) => e.preventDefault()}>
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
            <AdvancedMaturityMatrixField
              clientId={clientId}
              name="maturity_matrix"
              // Dates are useful for Smart Formula
              startDate={values.start_date}
              endDate={values.end_date}
            />
          </form>
        </FormikProvider>
      </div>
    </Panel>
  );
}
