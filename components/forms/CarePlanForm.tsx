import React, { FunctionComponent } from "react";
import { FormProps } from "@/types/form-props";
import {
  CARE_PLAN_STATUS,
  CarePlanFormType,
  CarePlanResDto,
} from "@/types/care-plan";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";

type CarePlanFormProps = FormProps<Partial<CarePlanResDto>> & {
  clientId: number;
};

const initialValues: CarePlanFormType = {
  description: "",
  start_date: "",
  end_date: "",
  status: "",
  temporary_file_ids: [],
};

const validationSchema: Yup.ObjectSchema<CarePlanFormType> = Yup.object().shape(
  {
    description: Yup.string().required("Dit veld is verplicht"),
    start_date: Yup.string().required("Dit veld is verplicht"),
    end_date: Yup.string().required("Dit veld is verplicht"),
    status: Yup.string()
      .oneOf(CARE_PLAN_STATUS)
      .required("Dit veld is verplicht"),
    temporary_file_ids: Yup.array()
      .of(Yup.string())
      .required("Dit veld is verplicht"),
  }
);

const CarePlanForm: FunctionComponent<CarePlanFormProps> = (props) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      props.onSuccess();
    },
  });
  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}></form>
    </FormikProvider>
  );
};

export default CarePlanForm;
