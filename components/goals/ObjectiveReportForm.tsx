import React, { FunctionComponent } from "react";
import { FormProps } from "@/types/form-props";
import { FormikProvider, useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import { ObjectiveReportFormType, ObjectiveReportResDto } from "@/types/goals";
import { useAddObjectiveReport, useUpdateObjectiveReport } from "@/utils/goal";
import RatingStars from "@/components/FormFields/RatingStars";
import Textarea from "@/components/FormFields/Textarea";
import Button from "@/components/buttons/Button";

type Props = FormProps<ObjectiveReportResDto> & {
  clientId: number;
  objectiveId: number;
};

const ObjectiveReportForm: FunctionComponent<Props> = ({
  clientId,
  objectiveId,
  onSuccess,
  onCancel,
  mode = "add",
  initialData,
}) => {
  const { mutate: create, isLoading: isCreating } = useAddObjectiveReport(
    clientId,
    objectiveId
  );
  const { mutate: update, isLoading: isUpdating } = useUpdateObjectiveReport(
    clientId,
    objectiveId,
    initialData?.id
  );
  const formik = useFormik<ObjectiveReportFormType>({
    initialValues: {
      date: "",
      content: "",
      rating: 0,
    },
    onSubmit: (values) => {
      const method = mode === "add" ? create : update;
      method(values, {
        onSuccess: () => {
          onSuccess && onSuccess();
        },
      });
    },
  });
  const { handleSubmit, handleBlur, handleChange, touched, errors, values } =
    formik;
  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Datum"
          name="date"
          type={"date"}
          onBlur={handleBlur}
          required={true}
          onChange={handleChange}
          className={"mb-6"}
          value={values.date}
          error={touched.date && errors.date}
        />
        <RatingStars
          name={"rating"}
          label={"Beoordeling / Evaluatie"}
          className="mb-6"
          required={true}
        />
        <Textarea
          label="Rapport"
          name="content"
          rows={6}
          className="mb-6"
          onBlur={handleBlur}
          required={true}
          onChange={handleChange}
          value={values.content}
          error={touched.content && errors.content}
          placeholder={"Schrijf hier uw rapport"}
        />
        <div className="flex gap-4">
          <Button type="button" buttonType={"Outline"} onClick={onCancel}>
            Annuleren
          </Button>
          <Button
            type="submit"
            className="w-full"
            disabled={isCreating || isUpdating}
            isLoading={isCreating || isUpdating}
          >
            {mode === "add" ? "Opslaan" : "Bijwerken"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default ObjectiveReportForm;
