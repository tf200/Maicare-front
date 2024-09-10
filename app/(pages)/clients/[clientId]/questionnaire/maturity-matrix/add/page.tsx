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
      start_date: Yup.string().required("Startdatum is verplicht"),
      end_date: Yup.string().required("Einddatum is verplicht"),
      maturity_matrix: Yup.array()
        .min(1, "Selecteer minimaal één domein om aan te werken!")
        .required("Dit veld is verplicht"),
    }),
    onSubmit: (values) => {
      const maturityMatrixes = values.maturity_matrix;

      for (let index = 0; index < maturityMatrixes.length; index++) {
        const domain = maturityMatrixes[index];
        if (domain.goal_ids.length === 0) {
          toast.error("Selecteer ten minste één doel voor elk domein!");
          return;
        }
      }
      createMaturityMatrix(values, {
        onSuccess() {
          toast.success("Zelfduurzaamheidsmatrix succesvol aangemaakt!");
          router.push(`/clients/${clientId}/questionnaire/maturity-matrix`);
        },
      });
    },
  });

  const { values, handleChange, handleBlur, touched, errors, handleSubmit } = formik;

  if (isError && axios.isAxiosError(error)) {
    toast.error(error.message);
  }

  return (
    <Panel
      title="Nieuwe Zelfduurzaamheidsmatrix"
      sideActions={
        <Button
          onClick={() => handleSubmit()}
          type="button"
          form="add-maturity-matrix-form"
          className="btn btn-primary"
        >
          {isCreating ? "Opslaan..." : "Opslaan"}
        </Button>
      }
    >
      <div className="p-5 overflow-hidden">
        <FormikProvider value={formik}>
          <form onSubmit={handleSubmit} id="add-maturity-matrix-form">
            <div className="grid grid-cols-2 gap-5">
              <InputField
                label={"Startdatum"}
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
                label={"Einddatum"}
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
              className="overflow-x-auto"
              // Dates are useful for Smart Formula
              startDate={values.start_date}
              endDate={values.end_date}/>
          </form>
        </FormikProvider>
      </div>
    </Panel>
  );
}
