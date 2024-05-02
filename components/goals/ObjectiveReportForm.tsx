import React, { FunctionComponent, useMemo } from "react";
import { FormProps } from "@/types/form-props";
import { FormikProvider, useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import {
  ObjectiveItem,
  ObjectiveReportFormType,
  ObjectiveReportResDto,
} from "@/types/goals";
import { useAddObjectiveReport, useUpdateObjectiveReport } from "@/utils/goal";
import RatingStars from "@/components/FormFields/RatingStars";
import Textarea from "@/components/FormFields/Textarea";
import Button from "@/components/buttons/Button";
import { maxWeekNumber, weekNumberRange } from "@/utils/weekHelpers";
import { dateFormat, fullDateFormat } from "@/utils/timeFormatting";

type Props = FormProps<ObjectiveReportResDto> & {
  clientId: number;
  objective: ObjectiveItem;
};

const ObjectiveReportForm: FunctionComponent<Props> = ({
  clientId,
  objective,
  onSuccess,
  onCancel,
  mode = "add",
  initialData,
}) => {
  const {
    mutate: create,
    isLoading: isCreating,
    isError: cantCreate,
  } = useAddObjectiveReport(clientId, objective.id);

  const { mutate: update, isLoading: isUpdating } = useUpdateObjectiveReport(
    clientId,
    objective.id,
    initialData?.id
  );

  const formik = useFormik<ObjectiveReportFormType>({
    initialValues: {
      week: "",
      content: "",
      rating: 0,
    },
    onSubmit: (values) => {
      const method = mode === "add" ? create : update;
      method(
        {
          ...values,
          week: parseInt(values.week),
        },
        {
          onSuccess: () => {
            onSuccess && onSuccess();
          },
        }
      );
    },
  });
  const { handleSubmit, handleBlur, handleChange, touched, errors, values } =
    formik;

  const range = useMemo(() => {
    if (!values.week) return;
    return weekNumberRange(objective.created, parseInt(values.week) - 1);
  }, [objective, values.week]);

  const maxWeekDiff = useMemo(() => {
    return maxWeekNumber(objective.created);
  }, [objective]);

  console.log("Range", range, maxWeekDiff);
  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Week"
          name="week"
          placeholder={"Week"}
          type={"number"}
          onBlur={handleBlur}
          required={true}
          unit={"Week"}
          onChange={handleChange}
          className={"mb-6"}
          value={values.week}
          error={touched.week && errors.week}
          min={1}
          max={maxWeekDiff ? maxWeekDiff + 1 : 1}
        />
        {values.week && range && (
          <section
            className={"flex gap-4 mb-6 bg-gray-3 rounded dark:bg-gray-2 p-4"}
          >
            <strong>Week #{values.week}:</strong>
            <div>Van: {dateFormat(range.start)}</div>
            <div>Tot: {dateFormat(range.end)}</div>
          </section>
        )}
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
        {cantCreate && (
          <section className="mb-6 -mt-4">
            <p className="text-red">***Kan geen rapport toevoegen</p>
          </section>
        )}
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
