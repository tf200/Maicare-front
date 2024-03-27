import React, { FunctionComponent } from "react";
import { FormProps } from "@/types/form-props";
import {
  CarePlanFormType,
  CarePlanResDto,
  CreateCarePlanReqDto,
} from "@/types/care-plan";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import RichText from "@/components/FormFields/RichText";
import { convertToRaw, EditorState } from "draft-js";
import InputField from "@/components/FormFields/InputField";
import FilesUploader from "@/components/FormFields/FilesUploader";
import Button from "@/components/buttons/Button";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { useCarePlanCreate } from "@/utils/care-plans";
import { useRouter } from "next/navigation";

type CarePlanFormProps = FormProps<Partial<CarePlanResDto>> & {
  clientId: number;
};

const initialValues: CarePlanFormType = {
  description: EditorState.createEmpty(),
  start_date: "",
  end_date: "",
  temporary_file_ids: [],
};

const validationSchema: Yup.ObjectSchema<CarePlanFormType> = Yup.object().shape(
  {
    description: Yup.mixed(),
    start_date: Yup.string().required("Dit veld is verplicht"),
    end_date: Yup.string().required("Dit veld is verplicht"),
    temporary_file_ids: Yup.array()
      .of(Yup.string())
      .required("Dit veld is verplicht"),
  }
);

function mapFormToCreateDTO(
  values: CarePlanFormType,
  clientId: number
): CreateCarePlanReqDto {
  return {
    client: clientId,
    description: draftToHtml(
      convertToRaw(values.description.getCurrentContent())
    ),
    start_date: values.start_date,
    end_date: values.end_date,
    temporary_file_ids: values.temporary_file_ids,
    status: "draft",
  };
}

function mapValuesToForm(values: Partial<CarePlanResDto>): CarePlanFormType {
  return {
    description: EditorState.createWithContent(htmlToDraft(values.description)),
    start_date: values.start_date || "",
    end_date: values.end_date || "",
    temporary_file_ids: values.attachments || [],
  };
}

const CarePlanForm: FunctionComponent<CarePlanFormProps> = (props) => {
  const { mutate: create, isLoading: isCreating } = useCarePlanCreate();
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      props.onSuccess();
      create(mapFormToCreateDTO(values, props.clientId), {
        onSuccess: () => {
          router.push("/care-plans");
        },
      });
    },
  });
  const { handleChange, handleBlur, touched, errors, values } = formik;
  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-4 mb-5">
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
        <RichText
          label={"Beschrijving"}
          name={"description"}
          className="mb-6"
        />
        <FilesUploader
          label={"Bestanden"}
          name={"temporary_file_ids"}
          id={"temporary_file_ids"}
        />
        <Button
          type="submit"
          isLoading={isCreating}
          disabled={isCreating}
          className="mt-5"
        >
          Opslaan
        </Button>
      </form>
    </FormikProvider>
  );
};

export default CarePlanForm;
