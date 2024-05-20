"use client";

import * as Yup from "yup";
import React, { FunctionComponent, useCallback, useMemo } from "react";
import { Formik, FormikProvider, useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import { FormikHelpers } from "formik/dist/types";
import Button from "@/components/buttons/Button";
import { NewReportsReqDto } from "@/types/reports/new-reports-req-dto";
import { useCreateReports } from "@/utils/reports/createReports";
import { useRouter } from "next/navigation";
import { usePatchReport } from "@/utils/reports/patchReport";
import { useGetReport } from "@/utils/reports/getReport";
import SmartTextarea from "@/components/FormFields/SmartTextarea";
import { useClientMedicationRecords } from "@/utils/medication-records";
import Link from "next/link";
import dayjs from "dayjs";
import { DAILY_REPORT_TYPES, DAILY_REPORT_TYPES_OPTIONS, EMOTIONAL_STATE_OPTIONS } from "@/consts";
import Select from "@/components/FormFields/Select";

type FormType = NewReportsReqDto;

export type ReportsFormType = FormType;

const initialValues: FormType = {
  title: "",
  report_text: "",
  created: "",
};

export const diagnosisSchema: Yup.ObjectSchema<FormType> = Yup.object().shape({
  title: Yup.string().optional().default(""),
  report_text: Yup.string().required("Geef alstublieft een rapport"),
  date: Yup.string(),
  client: Yup.number(),
  author: Yup.string(),
  id: Yup.number(),
  created: Yup.string().required("Gelieve de datum en tijd op te geven."),
  type: Yup.string().oneOf(DAILY_REPORT_TYPES),
  emotional_state: Yup.string().required("Gelieve de emotionele toestand op te geven."),
});

type PropsType = {
  clientId: number;
  className?: string;
  mode: string;
  reportsId?: number;
};

export const ReportsForm: FunctionComponent<PropsType> = ({
  clientId,
  className,
  mode,
  reportsId,
}) => {
  const router = useRouter();

  const {
    data,
    isLoading: isDataLoading,
    isError,
  } = useGetReport(reportsId, clientId);

  const { mutate: create, isLoading: isCreating } = useCreateReports(clientId);
  const { mutate: update, isLoading: isPatching } = usePatchReport(clientId);

  const onSubmit = useCallback(
    (values: FormType, { resetForm }: FormikHelpers<FormType>) => {
      if (mode === "edit") {
        update(
          {
            ...values,
            id: reportsId,
          },
          {
            onSuccess: () => {
              resetForm;
              router.push(`/clients/${clientId}/reports-record/reports`);
            },
          }
        );
      } else if (mode === "new") {
        create(values, {
          onSuccess: () => {
            resetForm;
            router.push(`/clients/${clientId}/reports-record/reports`);
          },
        });
      }
    },
    [create, update]
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:
      mode == "edit" ? (data ? data : initialValues) : initialValues,
    onSubmit: onSubmit,
    validationSchema: diagnosisSchema,
  });

  const { values, handleChange, handleBlur, touched, handleSubmit, errors } =
    formik;

  const { data: medicationRecords } = useClientMedicationRecords(clientId, {
    status: "awaiting",
    created: values.created?.split("T")?.[0],
  });

  const canSubmit = useMemo(() => {
    return medicationRecords?.count === 0;
  }, [medicationRecords]);

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} className={className}>
        {medicationRecords?.count > 0 && (
          <div className="p-6.5 bg-meta-6/20">
            <p>
              Er zijn nog medicatie records die nog niet zijn gerapporteerd.
              Gelieve eerst de medicatie records te rapporteren voordat u een
              rapport indient.{" "}
              <Link
                className="underline text-primary"
                href={`/clients/${clientId}/medical-record/medications`}
              >
                Klik hier om naar de medicatie records te gaan
              </Link>
            </p>
          </div>
        )}
        <div className="p-6.5">
          <Select
            label={"Type rapport"}
            name={"type"}
            required={true}
            options={DAILY_REPORT_TYPES_OPTIONS}
            value={values.type}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.type && errors.type}
            className={"w-full mb-4.5"}
          />
          <Select
            label={"Emotionele toestand"}
            name={"emotional_state"}
            required={true}
            options={EMOTIONAL_STATE_OPTIONS}
            value={values.emotional_state}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.emotional_state && errors.emotional_state}
            className={"w-full mb-4.5"}
          />
          {/* <InputField
            className={"w-full mb-4.5"}
            required={true}
            id={"title"}
            label={"Titel"}
            type={"text"}
            placeholder={"Voer de titel van de rapporten in"}
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && errors.title}
          /> */}

          <InputField
            className={"w-full mb-4.5"}
            required={true}
            id={"created"}
            max={dayjs().format("YYYY-MM-DDTHH:mm")}
            label={"Datum en tijd"}
            type={"datetime-local"}
            placeholder={"Voer de titel van de rapporten in"}
            value={values.created}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.created && errors.created}
          />

          <SmartTextarea
            rows={10}
            id={"report_text"}
            name={"report_text"}
            modalTitle={"Rapporten verbeteren"}
            required={true}
            className={"mb-6"}
            label={"Rapporten"}
            placeholder={"Geef alstublieft rapporten"}
            error={touched.report_text && errors.report_text}
          />
          <div className="text-muted mb-2">Voer meer dan 50 woorden in om het rapport in te dienen.</div>
          {values.report_text.split(" ").length > 50 && canSubmit && (
            <Button
              type={"submit"}
              disabled={isCreating || isPatching || !canSubmit}
              isLoading={isCreating || isPatching}
              formNoValidate={true}
              loadingText={mode === "edit" ? "Bijwerken..." : "Toevoegen..."}
            >
              {mode === "edit" ? "Rapport bijwerken" : "Rapport indienen"}
            </Button>
          )}
        </div>
      </form>
    </FormikProvider>
  );
};

export default ReportsForm;
