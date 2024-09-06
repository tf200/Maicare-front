"use client";
import Badge from "@/components/Badge";
import InputField from "@/components/FormFields/InputField";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import { getWarningActionConfirmationModal } from "@/components/Modals/WarningActionConfirmation";
import Panel from "@/components/Panel";
import Button from "@/components/buttons/Button";
import AdvancedMaturityMatrixField from "@/components/maturity_matrix/AdvancedMaturityMatrixField";
import { useModal } from "@/components/providers/ModalProvider";
import {
  useMaturityMatrixDetails,
  useUpdateMaturityMatrix,
  MaturityMatrixPatch,
  useArchiveMaturityMatrix,
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
  const { mutate: archiveMaturityMatrix, isLoading: isArchiving } = useArchiveMaturityMatrix(matrixId);
  const { data: matrixDetails, isLoading, isError, error } = useMaturityMatrixDetails(matrixId);

  const { open } = useModal(
    getWarningActionConfirmationModal({
      msg: "Weet u zeker dat u deze cliënt wilt verwijderen?",
      title: "Let op: Na het archiveren van deze volwassenheidsmatrix kun je deze niet meer bewerken",
    })
  );

  const formik = useFormik<MaturityMatrixPatch>({
    initialValues: !isLoading
      ? {
          client_id: clientId,
          start_date: matrixDetails.start_date,
          end_date: matrixDetails.end_date,
          is_archived: matrixDetails.is_archived || false,
          maturity_matrix: matrixDetails.selected_assessments.map((assessment) => ({
            domain_id: assessment.domain_id,
            level: assessment.level,
            goal_ids: assessment.goals.map((goal) => goal.id),
            assessment_id: assessment.id,
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
      start_date: Yup.string().required("Startdatum is verplicht"),
      end_date: Yup.string().required("Einddatum is verplicht"),
      maturity_matrix: Yup.array().min(1, "Selecteer een domein om aan te werken!").required(),
    }),
    onSubmit: (values) => {
      if (!values.is_archived) {
        updateMaturityMatrix(values, {
          onSuccess() {
            toast.success("Volwassenheidsmatrix succesvol bijgewerkt!");
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
    open({
      onConfirm: () => {
        archiveMaturityMatrix({ ...values, is_archived: true }, {
          onSuccess: () => {
            toast.success("Volwassenheidsmatrix gearchiveerd!");
            formik.setFieldValue("is_archived", true);
          },
        });
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
            className="btn btn-warning disabled:opacity-50" 
            disabled={isArchiving}
          >
            {isArchiving ? "Bezig met archiveren..." : "Markeren als gearchiveerd"}
          </Button>

          {/* Update Button (disabled when archived) */}
          <Button
            onClick={() => formik.handleSubmit()}
            type="button"
            form="add-maturity-matrix-form"
            className="btn btn-primary disabled:opacity-50"
            disabled={isUpdating}
          >
            {isUpdating ? "Bezig met bijwerken..." : "Bijwerken"}
          </Button>
        </div> }
        { matrixDetails && matrixDetails.is_archived && <Badge variant="warning">Gearchiveerd</Badge> }
        </>
      }
    >
      <div className="p-5">
        {isLoading ? (
          "Bezig met laden..."
        ) : (
          <FormikProvider value={formik}>
            <form onSubmit={(e) => e.preventDefault()}>
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
                  disabled={values.is_archived}
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
                  disabled={values.is_archived}
                />
              </div>
              <AdvancedMaturityMatrixField
                mode="edit"
                clientId={clientId}
                matrixId={matrixId}
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
