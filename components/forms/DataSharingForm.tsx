"use client";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../buttons/Button";
import { useRouter } from "next/navigation";
import { useCreateDataSharing } from "@/utils/questionnairs/data-sharing/useAddDataSharing";
import { useGetSingleDataSharing } from "@/utils/questionnairs/data-sharing/useGetSingleDataSharing";
import { useUpdateDataSharing } from "@/utils/questionnairs/data-sharing/useUpdateDataSharing";
import GeneralInfos, {
  GeneralInfosInitialValue,
  GeneralInfosShema,
} from "../Questionnaire/data-sharing/GeneralInfos";

type Props = {
  clientId: number;
  mode?: string;
  dataSharingId?: number;
};

const initialValues = {
  ...GeneralInfosInitialValue,
};

const formSchema = Yup.object().shape({
  ...GeneralInfosShema,
});

const DataSharingForm: React.FC<Props> = ({ clientId, dataSharingId, mode }) => {
  const FORMS = [{ name: "GeneralInfos", component: GeneralInfos, clientId }];

  const router = useRouter();
  const { mutate: createDataSharing, isLoading: isCreating } = useCreateDataSharing(clientId);
  const { data: singleDataSharingDeclaration, isLoading: isSingleColab } = useGetSingleDataSharing(
    dataSharingId,
    clientId
  );
  const { mutate: UpdateDataSharing, isLoading: isUpdating } = useUpdateDataSharing(clientId);
  const isLoading = isUpdating || isCreating;

  const onSubmit = (values) => {
    const payload = { client_id: clientId, ...values };

    const onSuccess = () => {
      router.push(`/clients/${clientId}/questionnaire/data-sharing`);
    };
    if (!singleDataSharingDeclaration) return createDataSharing(payload, { onSuccess });
    return UpdateDataSharing(payload, { onSuccess });
  };
  if (isSingleColab) return <p>Loading...</p>;
  return (
    <Formik
      enableReinitialize={true}
      initialValues={singleDataSharingDeclaration ?? initialValues}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleBlur, touched, handleSubmit, errors, setFieldValue }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              {FORMS.map(({ name, component: Component }) => (
                <Component
                  key={name}
                  handleChange={handleChange}
                  values={values}
                  handleBlur={handleBlur}
                  touched={touched}
                  errors={errors}
                  client_id={clientId}
                  setFieldValue={setFieldValue}
                />
              ))}
            </div>
            <Button
              type={"submit"}
              disabled={isLoading}
              isLoading={isLoading}
              formNoValidate={true}
              loadingText={mode === "edit" ? "Bijwerken..." : "Toevoegen..."}
            >
              {mode === "edit" ? "Update het delen van gegevens" : "Creëer een gegevensdeling"}
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default DataSharingForm;
