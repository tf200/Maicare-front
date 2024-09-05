"use client";
import DateTimePicker from "@/components/FormFields/DateTimePicker";
import InputField from "@/components/FormFields/InputField";
import Panel from "@/components/Panel";
import Button from "@/components/buttons/Button";
import AdvancedMaturityMatrixField from "@/components/maturity_matrix/AdvancedMaturityMatrixField";
import {
  useMaturityMatrixDetails,
  useUpdateMaturityMatrix,
  MaturityMatrixPatch,
  useArchiveMaturityMatrix, // <-- Import archive function
} from "@/utils/domains";
import axios from "axios";
import { FormikProvider, useFormik } from "formik";
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
  const { mutate: archiveMaturityMatrix, isLoading: isArchiving } = useArchiveMaturityMatrix(matrixId); // <-- Archive mutation
  const { data: matrixDetails, isLoading, isError, error } = useMaturityMatrixDetails(matrixId);

  const formik = useFormik<MaturityMatrixPatch>({
    initialValues: !isLoading
      ? {
          client_id: clientId,
          start_date: matrixDetails.start_date,
          end_date: matrixDetails.end_date,
          is_archived: matrixDetails.is_archived || false, // <-- Initialize is_archived
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
          is_archived: false,
          maturity_matrix: [],
        },
    enableReinitialize: true,
    validationSchema: Yup.object({
      start_date: Yup.string().required("Start date is required"),
      end_date: Yup.string().required("End date is required"),
      maturity_matrix: Yup.array().min(1, "Please select a domain to work on!").required(),
    }),
    onSubmit: (values) => {
      if (!values.is_archived) {
        updateMaturityMatrix(values, {
          onSuccess() {
            toast.success("Maturity matrix successfully updated!");
            router.push(`/clients/${clientId}/questionnaire/maturity-matrix`);
          },
        });
      }
    },
  });

  const { values, handleChange, handleBlur, touched, errors } = formik;

  if (isError && axios.isAxiosError(error)) {
    toast.error(error.message);
  }

  const handleArchive = () => {
    archiveMaturityMatrix({ ...values, is_archived: true }, {
      onSuccess: () => {
        toast.success("Maturity matrix archived!");
        formik.setFieldValue("is_archived", true); // <-- Set is_archived to true
      },
    });
  };

  return (
    <Panel
      title="Volwassenheidsmatrix bijwerken"
      sideActions={
        <>
        { matrixDetails && !matrixDetails.is_archived && <div className="flex justify-between gap-2">
          {/* Archive Button */}
          <Button
            onClick={handleArchive}
            type="button"
            className="btn btn-warning"
          >
            {isArchiving ? "Archiving..." : "Mark as Archived"}
          </Button>

          {/* Update Button (disabled when archived) */}
          <Button
            onClick={() => formik.handleSubmit()}
            type="button"
            form="add-maturity-matrix-form"
            className="btn btn-primary"
          >
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </div> }
        </>
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
                  disabled={values.is_archived} // <-- Disable when archived
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
                  disabled={values.is_archived} // <-- Disable when archived
                />
              </div>
              <AdvancedMaturityMatrixField
                mode="edit"
                clientId={clientId}
                name="maturity_matrix"
                className="overflow-x-auto"
              />
            </form>
          </FormikProvider>
        )}
      </div>
    </Panel>
  );
}
