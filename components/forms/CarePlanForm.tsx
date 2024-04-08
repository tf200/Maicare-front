import React, { FunctionComponent } from "react";
import { FormProps } from "@/types/form-props";
import {
  CarePlanFormType,
  CarePlanResDto,
  CreateCarePlanReqDto,
  UpdateCarePlanReqDto,
} from "@/types/care-plan";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import RichText from "@/components/FormFields/RichText";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import InputField from "@/components/FormFields/InputField";
import FilesUploader from "@/components/FormFields/FilesUploader";
import Button from "@/components/buttons/Button";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { useCarePlanCreate, useCarePlanPatch } from "@/utils/care-plans";
import { useRouter } from "next/navigation";
import FilesDeleter from "@/components/FormFields/FilesDeleter";
import MaturityMatrixField from "@/components/MaturityMatrixField";

type CarePlanFormProps = FormProps<Partial<CarePlanResDto>> & {
  clientId: number;
};

const initialValues: CarePlanFormType = {
  description: EditorState.createEmpty(),
  domain_ids: [],
  start_date: "",
  end_date: "",
  temporary_file_ids: [],
  attachment_ids_to_delete: [],
};

const validationSchema: Yup.ObjectSchema<CarePlanFormType> = Yup.object().shape(
  {
    description: Yup.mixed(),
    domain_ids: Yup.array().of(Yup.number()),
    start_date: Yup.string().required("Dit veld is verplicht"),
    end_date: Yup.string().required("Dit veld is verplicht"),
    temporary_file_ids: Yup.array()
      .of(Yup.string())
      .required("Dit veld is verplicht"),
    attachment_ids_to_delete: Yup.array().of(Yup.string()),
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
    domain_ids: values.domain_ids,
    start_date: values.start_date,
    end_date: values.end_date,
    temporary_file_ids: values.temporary_file_ids,
    status: "draft",
  };
}

function mapFormToUpdateDTO(
  values: CarePlanFormType,
  clientId: number
): UpdateCarePlanReqDto {
  return {
    client: clientId,
    description: draftToHtml(
      convertToRaw(values.description.getCurrentContent())
    ),
    start_date: values.start_date,
    end_date: values.end_date,
    temporary_file_ids: values.temporary_file_ids,
    status: "draft",
    domain_ids: values.domain_ids,
    attachment_ids_to_delete: values.attachment_ids_to_delete,
  };
}

function mapValuesToForm(values: Partial<CarePlanResDto>): CarePlanFormType {
  let editorState = EditorState.createEmpty();
  const contentBlock = htmlToDraft(values.description);
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    editorState = EditorState.createWithContent(contentState);
  }
  return {
    description: editorState,
    domain_ids: values.domain_ids || [],
    start_date: values.start_date || "",
    end_date: values.end_date || "",
    temporary_file_ids: [],
    attachment_ids_to_delete: [],
  };
}

const CarePlanForm: FunctionComponent<CarePlanFormProps> = (props) => {
  const { mode, initialData, clientId } = props;
  const { mutate: create, isLoading: isCreating } = useCarePlanCreate();
  const { mutate: update, isLoading: isUpdating } = useCarePlanPatch(
    initialData?.id
  );
  const router = useRouter();
  const formik = useFormik({
    initialValues:
      mode === "update" ? mapValuesToForm(initialData) : initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (mode === "update") {
        update(mapFormToUpdateDTO(values, clientId), {
          onSuccess: () => {
            router.push(`/clients/${clientId}/care-plans`);
          },
        });
        return;
      }
      create(mapFormToCreateDTO(values, props.clientId), {
        onSuccess: () => {
          router.push(`/clients/${props.clientId}/care-plans`);
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
        <MaturityMatrixField />
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
        {mode === "update" && (
          <FilesDeleter
            alreadyUploadedFiles={initialData.attachments}
            name={"attachment_ids_to_delete"}
            id={"attachment_ids_to_delete"}
          />
        )}
        <Button
          type="submit"
          isLoading={isCreating || isUpdating}
          disabled={isCreating || isUpdating}
          className="mt-5"
        >
          Opslaan
        </Button>
      </form>
    </FormikProvider>
  );
};

export default CarePlanForm;
