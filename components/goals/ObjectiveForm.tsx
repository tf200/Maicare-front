import React, { FunctionComponent } from "react";
import { FormikProvider, useFormik } from "formik";
import { ObjectiveFormType, ObjectiveItem } from "@/types/goals";
import * as Yup from "yup";
import InputField from "@/components/FormFields/InputField";
import Button from "@/components/buttons/Button";
import Textarea from "@/components/FormFields/Textarea";
import {
  useCreateObjective,
  useDeleteObjective,
  useUpdateObjective,
} from "@/utils/goal";
import RatingStars from "@/components/FormFields/RatingStars";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";

const initialValues: ObjectiveFormType = {
  title: "",
  rating: 0,
  desc: "",
};

const objectiveSchema: Yup.ObjectSchema<ObjectiveFormType> = Yup.object().shape(
  {
    title: Yup.string().required("Geef alstublieft een titel"),
    rating: Yup.number().required("Geef alstublieft een rating"),
    desc: Yup.string().required("Geef alstublieft een omschrijving"),
  }
);

const ObjectiveForm: FunctionComponent<{
  goalId: number;
  clientId: number;
  onSuccess?: () => void;
  mode?: "edit" | "create";
  initialData?: ObjectiveItem;
}> = ({ clientId, goalId, onSuccess, mode = "create", initialData }) => {
  const { mutate: create, isLoading: isCreating } = useCreateObjective(
    clientId,
    goalId
  );
  const { mutate: update, isLoading: isUpdating } = useUpdateObjective(
    clientId,
    initialData?.id
  );
  const { mutate: deleteObjective } = useDeleteObjective(clientId);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialData ? initialData : initialValues,
    validationSchema: objectiveSchema,
    onSubmit: (values) => {
      const method = mode === "edit" ? update : create;
      method(
        {
          ...values,
          rating: +values.rating,
        },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        }
      );
    },
  });
  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    formik;

  const { open: deleteObjectiveModal } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet je zeker dat je dit doel wilt verwijderen?",
      title: "Doel verwijderen",
    })
  );
  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <InputField
          required={true}
          type="text"
          name="title"
          placeholder={"Titel"}
          label={"Titel"}
          className={"mb-6"}
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.title && errors.title}
        />
        <RatingStars
          className="mb-6"
          name={"rating"}
          label={"Rating"}
          required={true}
        />
        <Textarea
          label={"Omschrijving"}
          placeholder={"Geef alstublieft een omschrijving"}
          required={true}
          rows={6}
          name="desc"
          className={"mb-4"}
          value={values.desc}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.desc && errors.desc}
        />
        <div className="flex justify-center gap-4">
          {initialData && mode === "edit" && (
            <Button
              buttonType={"Danger"}
              onClick={() => {
                deleteObjectiveModal({
                  onConfirm: () => {
                    deleteObjective(initialData?.id);
                    onSuccess?.();
                  },
                });
              }}
            >
              Verwijderen
            </Button>
          )}
          <Button
            isLoading={isCreating || isUpdating}
            disabled={isCreating || isUpdating}
            type="submit"
            formNoValidate={true}
          >
            Verzenden
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default ObjectiveForm;
