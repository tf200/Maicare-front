import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { FormProps } from "@/types/form-props";
import { FormikProvider, useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import dayjs from "dayjs";
import { ObjectiveItem, ObjectiveReportFormType, ObjectiveReportResDto } from "@/types/goals";
import { useAddObjectiveReport, useObjectiveHistory, useUpdateObjectiveReport } from "@/utils/goal";
import RatingStars from "@/components/FormFields/RatingStars";
import Textarea from "@/components/FormFields/Textarea";
import Button from "@/components/buttons/Button";
import { maxWeekNumber, weekNumberRange } from "@/utils/weekHelpers";
import { dateFormat } from "@/utils/timeFormatting";
import { useMaturityMatrixDetails } from "@/utils/domains";

type Props = FormProps<ObjectiveReportResDto> & {
  clientId: number;
  objective: ObjectiveItem;
  maturityMatrixId?: string;
};

const ObjectiveReportForm: FunctionComponent<Props> = ({
  clientId,
  objective,
  onSuccess,
  onCancel,
  mode = "add",
  initialData,
  maturityMatrixId,
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
  const [week, setWeek] = useState<string>("");
  const [error, setError] = useState<string>("");
  const onePerWeek = true;

  // get maturity matrix details for the start and end date
  const { data: maturityMatrixDetail } = useMaturityMatrixDetails(
    parseInt(maturityMatrixId)
  );
  // get objective history for knowing the week numbers
  const { data: objectiveHistory } = useObjectiveHistory(objective.id);

  let sortedObjectiveHistory = objectiveHistory.sort((a, b) => a.week - b.week);
  // logs for debugging

  useEffect(() => {
    if (maturityMatrixDetail && objectiveHistory && !week) {
      const totalWeeks = sortedObjectiveHistory.length;
      const date1 = dayjs(maturityMatrixDetail.start_date);
      const date2 = dayjs(maturityMatrixDetail.end_date);
  
      const differenceInWeeks = date2.diff(date1, "day") / 7;
      if (totalWeeks < differenceInWeeks) {
        setWeek((totalWeeks + 1).toString());
      } else {
        // set the error to the formik page that all weeks are filled and also shows more details like start and end date and the id of the maturity matrix
        return setError(
            "Je hebt alle weken van de zelf duurzaamheidsmatrix van id " +
            maturityMatrixId +
            " al ingevuld vanaf " +
            maturityMatrixDetail.start_date +
            " tot en met " +
            maturityMatrixDetail.end_date +
            " ",
        );
      }
    }
  }, [objectiveHistory, maturityMatrixDetail]);
  

  const formik = useFormik<ObjectiveReportFormType>({
    initialValues: {
      week: week,
      content: "",
      rating: 0,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const dateToCheck = dayjs(maturityMatrixDetail.start_date);
      dateToCheck.add((objectiveHistory.length || 0) + 1, "week");
      const currentDate = dayjs();
      if (onePerWeek) {
        if (currentDate.isAfter(range.start)) {
          const method = mode === "add" ? create : update;
          method(
            {
              ...values,
              rating: values.rating,
              week: parseInt(week),
            },
            {
              onSuccess: () => {
                onSuccess && onSuccess();
              },
            }
          );
        } else {
          // set the error to the formik page
          return setError("Je kan nog geen rapport toevoegen voor deze week");
        }
      } else {
        const method = mode === "add" ? create : update;
        method(
          {
            ...values,
            rating: values.rating,
            week: parseInt(week),
          },
          {
            onSuccess: () => {
              onSuccess && onSuccess();
            },
          }
        );
      }
    },
  });
  const { handleSubmit, handleBlur, handleChange, touched, errors, values } = formik;

  

  const range = useMemo(() => {
    if (!values.week) return;
    return weekNumberRange(objective.created, parseInt(values.week) - 1);
  }, [objective, values.week]);

  const maxWeekDiff = useMemo(() => {
    return maxWeekNumber(objective.created);
  }, [objective]);

  return (
    <>
      <div className="text-red">{error}</div>
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
            value={week}
            error={touched.week && errors.week}
            min={1}
            max={maxWeekDiff ? maxWeekDiff + 1 : 1}
            disabled={true}
          />
          {week && range && (
            <section className={"flex gap-4 mb-6 bg-gray-3 rounded dark:bg-gray-2 p-4"}>
              <strong>Week #{week}:</strong>
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
    </>
  );
};

export default ObjectiveReportForm;
