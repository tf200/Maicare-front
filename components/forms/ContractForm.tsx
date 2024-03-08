"use client";

import React, { FunctionComponent } from "react";
import { useFormik, FormikProvider } from "formik";
import { useCreateContract } from "@/utils/contracts/createContract";
import {
  COMPANY_CONTRACT_OPTIONS,
  CompanyContractType,
  CONTRACT_DURATION_OPTIONS,
  ContractDurationType,
  ContractFormType,
} from "@/types/contracts/contract-form-type";
import * as Yup from "yup";
import { CARE_TYPE_OPTIONS, RATE_TYPE_ARRAY } from "@/consts";
import InputField from "@/components/FormFields/InputField";
import Select from "@/components/FormFields/Select";
import Button from "@/components/buttons/Button";
import { NewContractReqDto } from "@/types/contracts/new-contract-req.dto";
import { useRouter } from "next/navigation";
import { useClientContact } from "@/components/clientDetails/ContactSummary";
import DetailCell from "@/components/DetailCell";
import { OpClientTypeRecord } from "@/components/forms/OpContactForms/OpContactForm";
import InfoIcon from "@/components/icons/InfoIcon";
import { useModal } from "@/components/providers/ModalProvider";
import ContactModal from "@/components/Modals/ContactModal";
import { GenericSelectionOption } from "@/types/selection-option";
import dayjs from "dayjs";
import { dateFormat } from "@/utils/timeFormatting";
import FilesUploader from "@/components/FormFields/FilesUploader";
import { RateType } from "@/types/rate-type";
import { ContactResDto } from "@/types/op-contact/contact-res.dto";

const initialValues: ContractFormType = {
  start_date: "",
  care_type: "",
  rate_type: "",
  rate_value: "",
  company_contract_period: "",
  client_contract_period: "",
  temporary_file_ids: [],
};

export const contractSchema: Yup.ObjectSchema<ContractFormType> =
  Yup.object().shape({
    start_date: Yup.string().required("Geef alstublieft de startdatum op"),
    care_type: Yup.string().required("Geef alstublieft het zorgtype op"),
    rate_type: Yup.string()
      .oneOf(RATE_TYPE_ARRAY)
      .required("Geef alstublieft het tarieftype op"),
    rate_value: Yup.string().required("Geef alstublieft het tarief op"),
    company_contract_period: Yup.string()
      .oneOf(COMPANY_CONTRACT_OPTIONS)
      .required("Geef alstublieft het bedrijfs contractperiode op"),
    client_contract_period: Yup.string()
      .oneOf(CONTRACT_DURATION_OPTIONS)
      .required("Geef alstublieft de client contractperiode op"),
    temporary_file_ids: Yup.array().max(
      5,
      "Maximaal 5 bijlagen zijn toegestaan"
    ),
  });

type PropsType = {
  clientId: number;
};

function mapData(
  form: ContractFormType,
  client: number,
  contact: number
): NewContractReqDto {
  return {
    client: client,
    sender: contact,
    start_date: form.start_date,
    client_contract_period: +form.client_contract_period,
    company_contract_period: +form.company_contract_period,
    care_type: form.care_type,
    rate_type: form.rate_type as RateType,
    rate_value: parseFloat(form.rate_value),
    temporary_file_ids: form.temporary_file_ids,
  };
}

const ClientPeriodOptions: GenericSelectionOption<
  string,
  ContractDurationType | ""
>[] = [
  { label: "Selecteer een periode", value: "" },
  { label: "3 maanden", value: "3" },
  { label: "6 maanden", value: "6" },
  { label: "9 maanden", value: "9" },
  { label: "12 maanden", value: "12" },
];

const CompanyContractOptions: GenericSelectionOption<
  string,
  CompanyContractType | ""
>[] = [
  { label: "Selecteer een contract", value: "" },
  { label: "1 per jaar", value: "1" },
];

const ContractForm: FunctionComponent<PropsType> = ({ clientId }) => {
  const { mutate, isLoading } = useCreateContract(clientId);
  const router = useRouter();
  const { data: contactData } = useClientContact(clientId);
  const onSubmit = (value: ContractFormType) => {
    mutate(mapData(value, clientId, contactData.id), {
      onSuccess: () => {
        router.push(`/clients/${clientId}/contracts`);
      },
    });
  };
  const formik = useFormik<ContractFormType>({
    initialValues,
    validationSchema: contractSchema,
    onSubmit,
  });

  const { values, handleChange, handleBlur, touched, handleSubmit, errors } =
    formik;
  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={handleSubmit}
        className="grid gap-10 grid-cols-1 lg:grid-cols-2"
      >
        <div>
          <ContactAssignment clientId={clientId} data={contactData} />
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <Select
              label={"Raamovereenkomst"}
              required={true}
              name={"company_contract_period"}
              id={"company_contract_period"}
              placeholder={"Voer Raamovereenkomst in"}
              options={CompanyContractOptions}
              className="w-full xl:w-1/2"
              value={values.company_contract_period}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.company_contract_period &&
                errors.company_contract_period
              }
            />
            <Select
              label={"Cliënt overeenkomst"}
              required={true}
              name={"client_contract_period"}
              id={"client_contract_period"}
              placeholder={"Voer Cliëntcontractperiode in"}
              options={ClientPeriodOptions}
              className="w-full xl:w-1/2"
              value={values.client_contract_period}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.client_contract_period && errors.client_contract_period
              }
            />
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <InputField
              label={"Startdatum"}
              required={true}
              id={"start_date"}
              type={"date"}
              className="w-full xl:w-1/2"
              value={(values.start_date ?? "") + ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.start_date &&
                errors.start_date &&
                errors.start_date + ""
              }
            />
            <div className={"w-full xl:w-1/2"}>
              <WhenNotification values={values} />
            </div>
          </div>
          <InputField
            className={"w-full mb-4.5"}
            id={"care_type"}
            required={true}
            type={"text"}
            label={"Zorgtype"}
            placeholder={"Voer Zorgtype in"}
            value={values.care_type}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.care_type && errors.care_type && errors.care_type + ""
            }
          />
          <div className="mb-6 flex flex-col gap-6 xl:flex-row">
            <Select
              label={"Tarieftype"}
              required={true}
              id={"rate_type"}
              className="w-full xl:w-1/2"
              value={values.rate_type}
              onChange={handleChange}
              onBlur={handleBlur}
              options={CARE_TYPE_OPTIONS}
              error={
                touched.rate_type && errors.rate_type && errors.rate_type + ""
              }
            />
            <InputField
              className={"w-full xl:w-1/2"}
              id={"rate_value"}
              required={true}
              type={"number"}
              min={0}
              step="0.01"
              label={"Tarief"}
              isPrice={true}
              placeholder={"Voer Tarief in"}
              value={values.rate_value}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.rate_value &&
                errors.rate_value &&
                errors.rate_value + ""
              }
            />
          </div>
        </div>
        <div>
          <FilesUploader
            label={"Bestanden"}
            name={"temporary_file_ids"}
            id={"temporary_file_ids"}
          />
        </div>
        <Button
          type={"submit"}
          disabled={isLoading}
          isLoading={isLoading}
          formNoValidate={true}
          loadingText={"Submitting Contract..."}
        >
          Contract Indienen
        </Button>
      </form>
    </FormikProvider>
  );
};

export default ContractForm;

const ContactAssignment: FunctionComponent<{
  data: ContactResDto;
  clientId: number;
}> = ({ data, clientId }) => {
  const { open } = useModal(ContactModal);
  return (
    <>
      {data && (
        <div className="mb-6 bg-gray rounded-md p-4 dark:bg-graydark dark:text-white">
          <h2 className="text-l font-bold mb-4">
            <InfoIcon className="inline-block relative -top-0.5" /> Maak een
            contracten voor de gegeven opdrachtgever
          </h2>
          <div className="flex flex-wrap gap-8">
            <DetailCell
              label={"Soort opdrachtgever"}
              value={OpClientTypeRecord[data.types]}
            />
            <DetailCell label={"Naam"} value={data.name} />
            <DetailCell
              label={"Telefoonnummer"}
              type={"phone"}
              value={data.phone_number}
            />
          </div>
        </div>
      )}
      {!data && (
        <div className="mb-6 flex flex-col p-4  info-box">
          <h2 className="text-l font-bold mb-4">
            <InfoIcon className="inline-block relative -top-0.5" /> Geen
            opdrachtgever toegewezen
          </h2>
          <p>
            Deze cliënt heeft geen opdrachtgever toegewezen, wijs er een toe
          </p>
          <Button
            className={"py-2 gap-2 self-center flex items-center px-6 mt-4"}
            onClick={() => {
              open({ clientId });
            }}
          >
            Voeg opdrachtgever toe
          </Button>
        </div>
      )}
    </>
  );
};

const WhenNotification: FunctionComponent<{ values: ContractFormType }> = ({
  values,
}) => {
  if (+values.client_contract_period > 3 && values.start_date) {
    const period = +values.client_contract_period;
    const reminderDate = dayjs(values.start_date)
      .add(period - 3, "month")
      .toDate();
    return (
      <div className="flex flex-col gap-2  pl-4 py-3 mt-3.5 info-box">
        <p>
          <InfoIcon className="inline-block relative -top-0.5" />{" "}
          <strong>Herinnering:</strong> U ontvangt een herinnering op{" "}
          {dateFormat(reminderDate)}
        </p>
      </div>
    );
  }
  return null;
};
