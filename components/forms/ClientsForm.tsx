"use client";

import * as Yup from "yup";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import Panel from "@/components/Panel";
import { Formik } from "formik";
import InputFieldThin from "@/components/FormFields/InputFieldThin";
import { FormikHelpers } from "formik/dist/types";
import Image from "next/image";
import CameraIcon from "@/components/svg/CameraIcon";
import { useCreateClients } from "@/utils/clients/createClients";
import { NewClientsRequest } from "@/types/clients/new-clients-request";
import RadioCustom from "../Checkboxes/RadioCustom";
import Button from "../buttons/Button";
import CheckIcon from "../svg/CheckIcon";
import { useRouter } from "next/navigation";
import LoadingCircle from "../icons/LoadingCircle";
import Select from "@/components/FormFields/Select";
import { SOURCE_OPTIONS } from "@/consts";

type FormType = NewClientsRequest;

export type ClientsFormType = FormType;

const initialValues: FormType = {
  id: 0,
  first_name: "",
  last_name: "",
  email: "",
  organisation: "",
  location: "",
  birthplace: "",
  departement: "",
  gender: "",
  filenumber: 0,
  date_of_birth: "",
  phone_number: "",
  profile_picture: "",
  city: "",
  Zipcode: "",
  infix: "",
  streetname: "",
  street_number: "",
  bsn: "",
  source: "",
};
// date_of_birth , identity , status ,
export const clientsSchema: Yup.ObjectSchema<FormType> = Yup.object().shape({
  id: Yup.number(),
  first_name: Yup.string().required("Please provide first name"),
  last_name: Yup.string().required("Please provide last Name"),
  email: Yup.string().required("Please provide your email Address"),
  phone_number: Yup.string().required("Please provide phon number"),
  profile_picture: Yup.string().required("Please provide profile picture"),
  departement: Yup.string(),
  filenumber: Yup.number(),
  location: Yup.string(),
  birthplace: Yup.string(),
  date_of_birth: Yup.string().required("Please provide date of birth"),
  organisation: Yup.string(),
  gender: Yup.string(),
  city: Yup.string(),
  Zipcode: Yup.string(),
  infix: Yup.string(),
  streetname: Yup.string(),
  street_number: Yup.string(),
  bsn: Yup.string().required("Please provide bsn"),
  source: Yup.string().required("Please provide source"),
});

type PropsType = {};

export const ClientsForm: FunctionComponent<PropsType> = ({}) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const onSuccessCallback = () => {
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const { mutate, isLoading } = useCreateClients(onSuccessCallback);

  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    "/images/user/user-default.png"
  );

  const onSubmit = useCallback(
    (values: FormType, { resetForm }: FormikHelpers<FormType>) => {
      setUploading(true);
      mutate(values, {
        onSuccess: () => {
          resetForm();
          setTimeout(() => setIsSuccess(false), 3000);
        },
      });
    },
    [mutate]
  );

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push("/clients");
      }, 5000);
    }
  }, [isSuccess, router]);

  return (
    <>
      {isSuccess && (
        <div className="flex w-full  bg-[#fff] bg-opacity-[15%] px-7 py-8   md:p-9">
          <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
            <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
              <CheckIcon />
            </div>

            <div className="w-full">
              <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399]">
                Clients Sent Successfully
              </h5>
            </div>
          </div>
        </div>
      )}

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={clientsSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          touched,
          handleSubmit,
          errors,
        }) => {
          const handleFileChange = async (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const file = event.target.files ? event.target.files[0] : null;
            if (file) {
              setUploading(true);

              try {
                const fileUrl = URL.createObjectURL(file);
                setImagePreviewUrl(fileUrl);
                setFieldValue("profile_picture", file);
                setUploading(false);
              } catch (error) {
                console.error("Error uploading file:", error);
                setUploading(false);
              }
            }
          };

          return (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">
                  <Panel
                    containerClassName="p-6.5 pb-5"
                    title={"Personal Details"}
                  >
                    <div className="px-4 mt-[70px] text-center">
                      <div className="relative z-30 w-full p-1 mx-auto rounded-full -mt-22 h-30 max-w-30 bg-white/20 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                        <div className="relative drop-shadow-2">
                          {uploading ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="animate-spin">
                                <LoadingCircle />
                              </span>
                            </div>
                          ) : (
                            <Image
                              alt="profile"
                              width={160}
                              height={160}
                              src={imagePreviewUrl}
                            />
                          )}
                          <label
                            htmlFor="profile"
                            className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                          >
                            <CameraIcon />
                            <input
                              type="file"
                              name="profile"
                              id="profile"
                              accept="image/jpeg,image/png,image/gif"
                              className="sr-only"
                              onChange={handleFileChange}
                              onBlur={handleBlur}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4.5 py-4 flex flex-col gap-6 xl:flex-row">
                      <InputFieldThin
                        type={"text"}
                        label={"First name"}
                        id={"first_name"}
                        placeholder={"Enter your first name"}
                        className="w-full xl:w-1/2"
                        value={values.first_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.first_name && errors.first_name}
                        required={true}
                      />

                      <InputFieldThin
                        type={"text"}
                        label={"Last name"}
                        id={"last_name"}
                        placeholder={"Enter your last name"}
                        className="w-full xl:w-1/2"
                        value={values.last_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.last_name && errors.last_name}
                        required={true}
                      />
                    </div>

                    <InputFieldThin
                      type={"text"}
                      label={"Email"}
                      id={"email"}
                      placeholder={"Enter your email address"}
                      className="w-full mb-4.5"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && errors.email}
                      required={true}
                    />

                    <InputFieldThin
                      label={"Phone Number"}
                      id={"phone_number"}
                      placeholder={"Phone Number"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.phone_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.phone_number && errors.phone_number}
                      required={true}
                    />

                    <InputFieldThin
                      label={"Infix"}
                      id={"infix"}
                      placeholder={"Enter infix"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.infix}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.infix && errors.infix}
                    />

                    <div className="mb-4.5 bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-6  px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Gender
                        </h3>
                      </div>
                      <div className="flex flex-row gap-5.5 p-6.5">
                        <RadioCustom
                          id={1}
                          type="radio"
                          label="Male"
                          name="gender"
                          value="Male"
                        />
                        <RadioCustom
                          id={2}
                          type="radio"
                          label={"Female"}
                          name="gender"
                          value="Female"
                        />
                        <RadioCustom
                          id={3}
                          type="radio"
                          label={"Not-specified"}
                          name="gender"
                          value="Not-specified"
                        />
                      </div>
                    </div>
                    <InputFieldThin
                      label={"Date of birth"}
                      required={true}
                      id={"date_of_birth"}
                      type={"date"}
                      className="w-full mb-4.5"
                      value={(values.date_of_birth ?? "") + ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.date_of_birth &&
                        errors.date_of_birth &&
                        errors.date_of_birth + ""
                      }
                    />
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        File Number
                      </label>

                      <input
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none  transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        id={"filenumber"}
                        placeholder={"File Number"}
                        type={"number"}
                        value={values.filenumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </Panel>

                  <Panel
                    containerClassName="p-6.5 pb-5"
                    title={"Identity Details"}
                  >
                    <InputFieldThin
                      label={"Bsn"}
                      id={"bsn"}
                      placeholder={"Enter bsn"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.bsn}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.bsn && errors.bsn}
                      required={true}
                    />
                    <Select
                      label={"Source"}
                      id={"source"}
                      placeholder={"Source"}
                      options={SOURCE_OPTIONS}
                      className="w-full mb-4.5"
                      value={values.source}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.source && errors.source}
                      required={true}
                    />
                  </Panel>
                </div>
                <div className="flex flex-col gap-9">
                  <Panel
                    containerClassName="p-6.5 pb-5"
                    title={"Locatiegegevens"}
                    // title={"Location Details"}
                  >
                    <InputFieldThin
                      label={"Locatie"}
                      id={"location"}
                      placeholder={"Locatie"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.location}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.location && errors.location}
                    />

                    <InputFieldThin
                      label={"Geboorteplaats"}
                      id={"birthplace"}
                      placeholder={"Geboorteplaats"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.birthplace}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.birthplace && errors.birthplace}
                    />

                    <InputFieldThin
                      label={"Afdeling"}
                      id={"departement"}
                      placeholder={"Afdeling"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.departement}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.departement && errors.departement}
                    />
                    <InputFieldThin
                      label={"Organisatie"}
                      id={"organisation"}
                      placeholder={"Organisatie"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.organisation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.organisation && errors.organisation}
                    />
                  </Panel>

                  <Panel
                    containerClassName="p-6.5 pb-5"
                    title={"Address Details"}
                  >
                    <InputFieldThin
                      label={"Street Name"}
                      id={"streetname"}
                      placeholder={"Street Name"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.streetname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.streetname && errors.streetname}
                    />

                    <InputFieldThin
                      label={"Street Number"}
                      id={"street_number"}
                      placeholder={"Street Number"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.street_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.street_number && errors.street_number}
                    />

                    <InputFieldThin
                      label={"City"}
                      id={"city"}
                      placeholder={"City"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.city && errors.city}
                    />

                    <InputFieldThin
                      label={"Zip code"}
                      id={"Zipcode"}
                      placeholder={"Zip code"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.Zipcode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.Zipcode && errors.Zipcode}
                    />
                  </Panel>
                </div>
                <Button
                  type={"submit"}
                  disabled={isLoading}
                  isLoading={isLoading}
                  formNoValidate={true}
                >
                  Submit Clients
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default ClientsForm;
