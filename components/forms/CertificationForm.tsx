import React, { FunctionComponent } from "react";
import { useFormik } from "formik";
import { CertificateFormType } from "@/types/certificates/certificate-form-type";
import InputFieldThin from "@/components/FormFields/InputFieldThin";
import { useCreateCertificate } from "@/utils/certificates/create-certificate";
import { useUpdateCertificate } from "@/utils/certificates/update-certificate";
import { CertifResDto } from "@/types/certificates/certif-res.dto";
import Button from "@/components/buttons/Button";
import * as Yup from "yup";
import { FormProps } from "@/types/form-props";

const initialValues: CertificateFormType = {
  name: "",
  issued_by: "",
  date_issued: "",
};

type Props = FormProps<CertifResDto> & {
  employeeId: number;
};

const certificateSchema: Yup.ObjectSchema<CertificateFormType> = Yup.object({
  name: Yup.string().required("Title is required"),
  issued_by: Yup.string().required("Issued by is required"),
  date_issued: Yup.string().required("Date issued is required"),
});

const CertificationForm: FunctionComponent<Props> = ({
  mode = "add",
  onSuccess,
  employeeId,
  initialData,
}) => {
  const { mutate: create, isLoading: isCreating } = useCreateCertificate();
  const { mutate: update, isLoading: isUpdating } = useUpdateCertificate();

  function onSubmit(value: CertificateFormType) {
    if (mode === "add") {
      create(
        {
          ...value,
          employee: employeeId,
        },
        {
          onSuccess,
        }
      );
    } else if (mode === "update") {
      update(
        {
          ...value,
          employee: employeeId,
          id: initialData.id,
        },
        {
          onSuccess,
        }
      );
    }
  }
  const { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik<CertificateFormType>({
      initialValues: mode === "update" ? initialData : initialValues,
      onSubmit: onSubmit,
      validationSchema: certificateSchema,
    });
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <InputFieldThin
          className="w-full xl:w-1/2"
          name="name"
          id="name"
          label="Title"
          placeholder="Please enter the title of the certificate"
          type="text"
          value={values.name}
          required={true}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && errors.name}
        />
        <InputFieldThin
          className="w-full xl:w-1/2"
          name="issued_by"
          id="issued_by"
          label="Issued By"
          placeholder="Please enter the name of the issuer"
          type="text"
          value={values.issued_by}
          required={true}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.issued_by && errors.issued_by}
        />
      </div>
      <div className="mb-6 flex flex-col gap-6 xl:flex-row">
        <InputFieldThin
          className="w-full xl:w-1/2"
          name="date_issued"
          id="date_issued"
          label="Date Issued"
          placeholder="Please enter the date the certificate was issued"
          value={values.date_issued}
          required={true}
          onChange={handleChange}
          onBlur={handleBlur}
          type="date"
          error={touched.date_issued && errors.date_issued}
        />
        <div className="w-full xl:w-1/2" />
      </div>
      <Button
        type="submit"
        formNoValidate={true}
        isLoading={isCreating || isUpdating}
        loadingText={mode === "add" ? "Adding..." : "Updating..."}
      >
        {mode === "add" ? "Submit Certificate" : "Update Certificate"}
      </Button>
    </form>
  );
};

export default CertificationForm;
