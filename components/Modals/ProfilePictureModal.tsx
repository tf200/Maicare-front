import { ModalProps } from "@/types/modal-props";
import { FunctionComponent, useCallback, useState } from "react";
import FormModal from "./FormModal";
import CameraIcon from "@/components/svg/CameraIcon";
import ModalActionButton from "../buttons/ModalActionButton";
import * as Yup from "yup";
import { usePatchEmployeePic } from "@/utils/employees/patchEmployeePicture";
import { Formik, FormikConfig } from "formik";
import ProfilePicture from "../ProfilePicture";
import { UseMutationResult } from "react-query";
import { usePatchClientProfilePicture } from "@/utils/clients/patchClient";

type Props = ModalProps & {
  additionalProps: {
    id: number;
  };
};

export const EmployeeProfilePictureModal: FunctionComponent<Props> = ({
  additionalProps,
  ...props
}) => {
  const mutation = usePatchEmployeePic(additionalProps.id);

  return (
    <FormModal {...props} open={true} title="Profielfoto Toevoegen">
      <UpdatePicModalForm onUpdated={props.onClose} mutation={mutation} />
    </FormModal>
  );
};

export const ClientProfilePictureModal: FunctionComponent<Props> = ({
  additionalProps,
  ...props
}) => {
  const mutation = usePatchClientProfilePicture(additionalProps.id);

  return (
    <FormModal {...props} open={true} title="Profielfoto Toevoegen">
      <UpdatePicModalForm onUpdated={props.onClose} mutation={mutation} />
    </FormModal>
  );
};

const pictureSchema: Yup.ObjectSchema<{ profile_picture: string }> =
  Yup.object().shape({
    profile_picture: Yup.string(),
  });

type UpdatePicModalFormProps = {
  onUpdated: () => void;
  mutation: UseMutationResult<any, unknown, string, unknown>;
};

type FormType = {
  profile_picture: string;
};

const initialValues: FormType = {
  profile_picture: "",
};

const UpdatePicModalForm: FunctionComponent<UpdatePicModalFormProps> = ({
  onUpdated,
  mutation,
}) => {
  const { mutate, isLoading } = mutation;
  const [errorMessage, setErrorMessage] = useState("");
  const defaultImageUrl = "/images/user/user-default.png";
  const [imagePreviewUrl, setImagePreviewUrl] = useState(defaultImageUrl);

  const onSubmit: FormikConfig<FormType>["onSubmit"] = useCallback(
    (data, { resetForm }) => {
      setErrorMessage(null);
      if (!data.profile_picture) {
        setErrorMessage("Geef alstublieft een profielfoto op");
        return;
      }
      mutate(data.profile_picture, {
        onSuccess: () => {
          resetForm();
          onUpdated();
        },
      });
    },
    [mutate]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={pictureSchema}
    >
      {({ setFieldValue, handleSubmit }) => {
        const handleFileChange = async (
          event: React.ChangeEvent<HTMLInputElement>
        ) => {
          if (event.target.files) {
            const fileUrl = URL.createObjectURL(event.target.files[0]);
            setImagePreviewUrl(fileUrl);
            setFieldValue("profile_picture", event.target.files[0]);
          }
        };

        return (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative drop-shadow-2 w-full mx-auto rounded-full max-w-30 bg-white/20 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="w-40 h-40">
                <ProfilePicture
                  width={160}
                  height={160}
                  profilePicture={imagePreviewUrl}
                />
              </div>
              <label
                htmlFor="profile_picture"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
                <CameraIcon />
                <input
                  type="file"
                  name="profile_picture"
                  id="profile_picture"
                  accept="image/jpeg,image/png,image/gif"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {errorMessage && (
              <div className="text-red text-center">{errorMessage}</div>
            )}

            <ModalActionButton
              className="mt-7"
              actionType="CONFIRM"
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Foto Bijwerken
            </ModalActionButton>
          </form>
        );
      }}
    </Formik>
  );
};
