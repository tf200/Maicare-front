"use client";

import { DaysOfWeekSelect } from "@/components/DaysOfWeekSelect";
import Panel from "@/components/Panel";
import WorkingHoursField from "@/components/WorkingHoursField";
import Button from "@/components/buttons/Button";
import { Form, FormikProvider, useFormik } from "formik";

export default function TestPage() {
  const formik = useFormik({
    initialValues: {
      days_of_week: [1, 2], // [0, 1, 2, 3, 4, 5, 6]
      working_hours: [
        ["08:00", "12:00"],
        ["13:00", "17:00"],
      ],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Panel title="Test Page">
      <div className="p-5">
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <DaysOfWeekSelect name="days_of_week" label="Days of Week" required />

            <WorkingHoursField name="working_hours" label="Working Hours" />

            <Button type="submit" className="btn btn-primary mt-5">
              Submit
            </Button>
          </form>
        </FormikProvider>
      </div>
    </Panel>
  );
}
