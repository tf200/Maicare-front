"use client";

import React, { FunctionComponent } from "react";
import Panel from "@/components/Panel";
import { useCarePlan, useCarePlanPatch } from "@/utils/care-plans";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";
import {
  CARE_PLAN_STATUS_OPTIONS,
  CARE_PLAN_STATUS_TRANSLATION,
  CARE_PLAN_STATUS_VARIANT,
} from "@/consts";
import StatusBadge from "@/components/StatusBadge";
import { dateFormat } from "@/utils/timeFormatting";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import { useFormik } from "formik";
import Select from "@/components/FormFields/Select";
import { CARE_PLAN_STATUS, CarePlanStatus } from "@/types/care-plan";
import Button from "@/components/buttons/Button";

const PlanDetails: FunctionComponent<{
  params: {
    planId: string;
  };
}> = ({ params: { planId } }) => {
  const { data, isLoading } = useCarePlan(parseInt(planId));
  const { data: clientData } = useClientDetails(data?.client || 0);
  return (
    <Panel title={`Zorgplan: #${planId}`}>
      {isLoading && <Loader />}
      {data && (
        <div className="border-b-1 border-stroke px-7 py-4">
          <h2 className="mb-6 font-bold">Status wijzigen</h2>
          <UpdateStatus planId={+planId} status={data.status} />
        </div>
      )}
      {data && (
        <div className="grid grid-cols-2 gap-4 px-7 py-4">
          <DetailCell
            label={"Client"}
            value={`${clientData?.first_name} ${clientData?.last_name}`}
          />
          <DetailCell
            label={"Status"}
            value={
              <StatusBadge
                type={CARE_PLAN_STATUS_VARIANT[data.status] || "Outline"}
                text={CARE_PLAN_STATUS_TRANSLATION[data.status]}
              />
            }
          />
          <DetailCell label={"Van"} value={dateFormat(data.start_date)} />
          <DetailCell label={"Tot"} value={dateFormat(data.end_date)} />
          <DetailCell
            className={"col-span-2"}
            label={"Omschrijving"}
            value={
              <div
                dangerouslySetInnerHTML={{
                  __html: data.description,
                }}
              />
            }
          />
        </div>
      )}
    </Panel>
  );
};

export default PlanDetails;

const UpdateStatus: FunctionComponent<{
  planId: number;
  status: CarePlanStatus;
}> = ({ planId, status: planStatus }) => {
  const { isLoading, mutate } = useCarePlanPatch(planId);
  const { handleSubmit, values, handleBlur, handleChange } = useFormik({
    initialValues: {
      status: planStatus,
    },
    onSubmit: (values) => {
      mutate({
        status: values.status as CarePlanStatus,
      });
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <Select
        label={"Status"}
        name={"status"}
        className={"max-w-70 mb-6"}
        options={CARE_PLAN_STATUS_OPTIONS}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.status}
      />
      <Button type="submit" isLoading={isLoading} disabled={isLoading}>
        Opslaan
      </Button>
    </form>
  );
};
