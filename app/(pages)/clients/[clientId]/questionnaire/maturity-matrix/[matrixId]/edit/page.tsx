"use client";
import DateTimePicker from "@/components/FormFields/DateTimePicker";
import InputField from "@/components/FormFields/InputField";
import Panel from "@/components/Panel";
import Button from "@/components/buttons/Button";
import AdvancedMaturityMatrixField from "@/components/maturity_matrix/AdvancedMaturityMatrixField";
import {
  MaturityMatrixPayload,
  useCreateMaturityMatrix,
  useMaturityMatrixDetails,
  useUpdateMaturityMatrix,
} from "@/utils/domains";
import axios from "axios";
import { Formik, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

type EditMaturityMatrixPageProps = {
  params: {
    clientId: number;
    matrixId: number;
  };
};

export default function EditMaturityMatrixPage({
  params: { clientId, matrixId },
}: EditMaturityMatrixPageProps) {
  const router = useRouter();
  const { mutate: updateMaturityMatrix, isLoading: isUpdating } = useUpdateMaturityMatrix(matrixId);
  const { data: matrixDetails, isLoading, isError, error } = useMaturityMatrixDetails(matrixId);

  const formik = useFormik<MaturityMatrixPayload>({
    initialValues: !isLoading
      ? {
          client_id: clientId,
          start_date: matrixDetails.start_date,
          end_date: matrixDetails.end_date,
          maturity_matrix: matrixDetails.selected_assessments.map((assessment) => ({
            domain_id: assessment.domain_id,
            level: assessment.level,
            goal_ids: assessment.goals.map((goal) => goal.id),
          })),
        }
      : {
          client_id: clientId,
          start_date: "",
          end_date: "",
          maturity_matrix: [],
        },
    enableReinitialize: true,
    validationSchema: Yup.object({
      start_date: Yup.string().required("Start date is required"),
      end_date: Yup.string().required("End date is required"),
      maturity_matrix: Yup.array().min(1, "Please select a domain to work on!").required(),
    }),
    onSubmit: (values) => {
      updateMaturityMatrix(values, {
        onSuccess() {
          toast.success("Maturity matrix successfully updated!");
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
      title="Volwassenheidsmatrix bijwerken"
      sideActions={
        <Button
          onClick={() => formik.handleSubmit()}
          type="button"
          form="add-maturity-matrix-form"
          className="btn btn-primary"
        >
          {isUpdating ? "Updating..." : "Update"}
        </Button>
      }
    >
      <div className="p-5">
        {isLoading ? (
          "Loading..."
        ) : (
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
              <AdvancedMaturityMatrixField mode="edit" clientId={clientId} name="maturity_matrix" className="overflow-x-auto" />
            </form>
          </FormikProvider>
        )}
      </div>
    </Panel>
  );
}
