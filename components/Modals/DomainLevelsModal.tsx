import React, { FunctionComponent } from "react";
import FormModal from "@/components/Modals/FormModal";
import { ModalProps } from "@/types/modal-props";
import { FormikProvider, useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import Button from "@/components/buttons/Button";

const DomainLevelsModal: FunctionComponent<ModalProps> = ({
  open,
  onClose,
}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      levels: new Array(5).map((_, i) => {
        return {
          assessment: "",
          level: i + 1,
        };
      }),
    },
    onSubmit: (value) => {
      console.log(value);
    },
  });
  const { handleSubmit, handleChange, values, handleBlur, touched, errors } =
    formik;
  return (
    <FormModal open={open} onClose={onClose} title={"Add domain"}>
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <InputField
            name="name"
            label="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name}
          />
          {values.levels.map((level, i) => (
            <div key={i}>
              <span>Level {i + 1}</span>
              <InputField
                name={`levels[${i}].assessment`}
                placeholder={"Please enter assessment for this level"}
                label={`Assessment ${i + 1}`}
                value={level.assessment}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.levels && touched.levels[i]?.assessment}
              />
            </div>
          ))}

          <Button type="submit">Submit</Button>
        </form>
      </FormikProvider>
    </FormModal>
  );
};

export default DomainLevelsModal;
