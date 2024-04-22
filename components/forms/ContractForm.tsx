"use client";

import React, { FunctionComponent, useMemo } from "react";
import { useFormik, FormikProvider } from "formik";
import { useCreateContract } from "@/utils/contracts/createContract";
import {
  COMPANY_CONTRACT_OPTIONS,
  CompanyContractType,
  ContractFormType,
} from "@/types/contracts/contract-form-type";
import * as Yup from "yup";
import {
  CARE_RATE_BY_TYPE,
  CARE_RATE_OPTIONS_BY_TYPE,
  CARE_TYPE_ARRAY,
  CARE_TYPE_OPTIONS,
  RATE_TYPE_ARRAY,
} from "@/consts";
import InputField from "@/components/FormFields/InputField";
import Select from "@/components/FormFields/Select";
import Button from "@/components/buttons/Button";
import {
  CareType,
  NewContractReqDto,
} from "@/types/contracts/new-contract-req.dto";
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
import { FormProps } from "@/types/form-props";
import { ContractResDto } from "@/types/contracts/contract-res.dto";
import { useUpdateContract } from "@/utils/contracts/updateContract";
import { mapToForm } from "@/utils/contracts/mapToForm";
import FilesDeleter from "@/components/FormFields/FilesDeleter";
import {
  useContractTypes,
  useCreateContractType,
  useDeleteContractType,
} from "@/utils/contract-types";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import {
  ContractTypeCreateReqDto,
  ContractTypeItem,
} from "@/types/contract-type";
import IconButton from "@/components/buttons/IconButton";
import TrashIcon from "@/components/icons/TrashIcon";
import Loader from "@/components/common/Loader";

const initialValues: ContractFormType = {
  start_date: "",
  end_date: "",
  care_type: "",
  rate_type: "",
  rate_value: "",
  company_contract_period: "",
  added_attachments: [],
  removed_attachments: [],
  reminder_period: "",
  tax: "",
  contract_name: "",
  type: "",
};

export const contractSchema: Yup.ObjectSchema<ContractFormType> =
  Yup.object().shape({
    start_date: Yup.string().required("Geef alstublieft de startdatum op"),
    end_date: Yup.string().required("Geef alstublieft de startdatum op"),
    care_type: Yup.string()
      .oneOf(CARE_TYPE_ARRAY)
      .required("Geef alstublieft het zorgtype op"),
    rate_type: Yup.string()
      .oneOf(RATE_TYPE_ARRAY)
      .test(
        "valid_rate_type",
        "Geef alstublieft het tarieftype op",
        (value, ctx) => {
          if (value && ctx.parent.care_type) {
            return (
              CARE_RATE_BY_TYPE[ctx.parent.care_type]?.includes(value) ?? false
            );
          }
          return false;
        }
      )
      .required("Geef alstublieft het tarieftype op"),
    rate_value: Yup.string().required("Geef alstublieft het tarief op"),
    company_contract_period: Yup.string()
      .oneOf(COMPANY_CONTRACT_OPTIONS)
      .required("Geef alstublieft het bedrijfs contractperiode op"),
    added_attachments: Yup.array(),
    removed_attachments: Yup.array(),
    reminder_period: Yup.string()
      .required("Geef alstublieft de herinneringsperiode op")
      .test(
        "within-range",
        "Herinneringsperiode moet binnen de contractperiode vallen",
        function (value, ctx) {
          const start = ctx.parent.start_date;
          const end = ctx.parent.end_date;
          if (start && end && value) {
            return dayjs(start).isBefore(dayjs(end).subtract(+value, "days"));
          }
          return true;
        }
      ),
    tax: Yup.string().required("Geef alstublieft de belasting op"),
    contract_name: Yup.string().required("Geef alstublieft de contractnaam op"),
    type: Yup.string().required("Geef alstublieft het type op"),
  });

type PropsType = {
  clientId: number;
} & FormProps<ContractResDto>;

function mapData(
  form: ContractFormType,
  client: number,
  contact: number,
  contractToEdit?: ContractResDto
): NewContractReqDto {
  return {
    client_id: client,
    sender_id: contact,
    start_date: form.start_date,
    end_date: form.end_date,
    care_type: form.care_type as CareType,
    price_frequency: form.rate_type as RateType,
    price: parseFloat(form.rate_value),
    attachments:
      contractToEdit?.attachments
        ?.map((a) => a.id)
        .filter((a) => !form.removed_attachments.includes(a))
        .concat(form.added_attachments) ?? form.added_attachments,
    reminder_period: +form.reminder_period,
    tax: +form.tax,
    care_name: form.contract_name,
    type_id: +form.type,
  };
}

const CompanyContractOptions: GenericSelectionOption<
  string,
  CompanyContractType | ""
>[] = [
  { label: "Selecteer een contract", value: "" },
  { label: "1 per jaar", value: "1" },
];

const ContractForm: FunctionComponent<PropsType> = ({
  clientId,
  mode = "add",
  initialData,
}) => {
  const parsedInitialValues = useMemo(() => {
    return initialData
      ? { ...initialValues, ...mapToForm(initialData) }
      : initialValues;
  }, [initialData]);
  const { mutate: create, isLoading: isCreating } = useCreateContract(clientId);
  const { mutate: update, isLoading: isUpdating } = useUpdateContract(
    initialData?.id
  );
  const router = useRouter();
  const { data: contactData } = useClientContact(clientId);
  const onSubmit = (value: ContractFormType) => {
    const method = mode === "add" ? create : update;
    method(mapData(value, clientId, contactData.id), {
      onSuccess: () => {
        router.push(`/clients/${clientId}/contracts`);
      },
    });
  };
  const formik = useFormik<ContractFormType>({
    initialValues: parsedInitialValues,
    validationSchema: contractSchema,
    onSubmit,
  });

  const { data: contractTypes } = useContractTypes();

  const contractTypeOptions = useMemo(() => {
    if (!contractTypes) {
      return [];
    }
    return [
      { label: "Selecteer contracttype", value: "" },
      ...contractTypes.map((contractType) => ({
        label: contractType.name,
        value: contractType.id + "",
      })),
    ];
  }, [contractTypes]);

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
            <InputField
              label={"Contractnaam"}
              className={"w-full xl:w-1/2"}
              placeholder={"Voer Contractnaam in"}
              required={true}
              id={"contract_name"}
              value={values.contract_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.contract_name &&
                errors.contract_name &&
                errors.contract_name + ""
              }
            />
            <Select
              label={"Contract Type"}
              className={"w-full xl:w-1/2"}
              required={true}
              name={"type"}
              id={"type"}
              placeholder={"Selecteer Contract Type"}
              options={contractTypeOptions}
              value={values.type}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.type && errors.type && errors.type + ""}
            />
          </div>
          <div className="flex flex-col xl:flex-row gap-6 mb-6">
            <div className="xl:w-1/2" />
            <div className="xl:w-1/2">
              <ManageContractType />
            </div>
          </div>
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
            {/*reminder in days*/}
            <InputField
              label={"Herinneringsperiode"}
              placeholder={"Dagen"}
              required={true}
              id={"reminder_period"}
              type={"number"}
              min={0}
              className="w-full xl:w-1/2"
              value={values.reminder_period}
              onChange={handleChange}
              onBlur={handleBlur}
              unit={"dagen"}
              error={
                touched.reminder_period &&
                errors.reminder_period &&
                errors.reminder_period + ""
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
              min={dayjs().format("YYYY-MM-DD")}
              max={values.end_date}
              error={
                touched.start_date &&
                errors.start_date &&
                errors.start_date + ""
              }
            />
            <InputField
              label={"Einddatum"}
              required={true}
              id={"end_date"}
              type={"date"}
              className="w-full xl:w-1/2"
              min={values.start_date}
              value={(values.end_date ?? "") + ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.end_date && errors.end_date && errors.end_date + ""
              }
            />
          </div>
          <Select
            className={"w-full mb-4.5"}
            id={"care_type"}
            required={true}
            options={CARE_TYPE_OPTIONS}
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
              disabled={!values.care_type}
              className="w-full xl:w-1/2"
              value={values.rate_type}
              onChange={handleChange}
              onBlur={handleBlur}
              options={
                CARE_RATE_OPTIONS_BY_TYPE[values.care_type] ?? [
                  {
                    label: "Selecteer Tarieftype",
                    value: "",
                  },
                ]
              }
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
          <div className="mb-6 flex flex-col gap-6 xl:flex-row">
            <InputField
              name={"tax"}
              id={"tax"}
              required={true}
              type={"number"}
              min={0}
              step="0.1"
              label={"BTW percentage"}
              unit={"%"}
              placeholder={"Voer BTW percentage in"}
              value={values.tax}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.tax && errors.tax && errors.tax + ""}
              className="w-full xl:w-1/2"
            />
            <div className="w-full xl:w-1/2 h-0" />
          </div>
        </div>
        <div>
          <div className="mb-6">
            <WhenNotification values={values} />
          </div>
          <FilesUploader
            label={"Bestanden"}
            name={"added_attachments"}
            id={"added_attachments"}
          />
          {mode === "update" && initialData?.attachments && (
            <FilesDeleter
              alreadyUploadedFiles={initialData.attachments}
              name={"removed_attachments"}
              id={"removed_attachments"}
            />
          )}
        </div>
        <Button
          type={"submit"}
          disabled={isCreating || isUpdating}
          isLoading={isCreating || isUpdating}
          formNoValidate={true}
          loadingText={"Submitting Contract..."}
        >
          {mode === "add" ? "Contract Indienen" : "Contract Bijwerken"}
        </Button>
      </form>
    </FormikProvider>
  );
};

export default ContractForm;

export const ContactAssignment: FunctionComponent<{
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

export const WhenNotification: FunctionComponent<{
  values: ContractFormType;
}> = ({ values }) => {
  if (values.end_date && values.start_date && values.reminder_period) {
    const reminderDate = dayjs(values.end_date)
      .subtract(+values.reminder_period, "days")
      .toDate();
    return (
      <div className="flex flex-col gap-2 px-4 py-3 info-box">
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

const ManageContractType: FunctionComponent = () => {
  const { open } = useModal(ManageContractTypeModal);
  return (
    <button
      type={"button"}
      onClick={() => {
        open({});
      }}
      className="flex w-full flex-col gap-2 px-4 py-3 info-box"
    >
      <p>
        <InfoIcon className="inline-block relative -top-0.5" />{" "}
        <span>
          Beheer contracttypen?{" "}
          <div className="inline-block text-primary">Klik hier!</div>
        </span>
      </p>
    </button>
  );
};

const ManageContractTypeModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...props
}) => {
  const { data, isLoading } = useContractTypes();
  const { mutate: createContractType, isLoading: isCreating } =
    useCreateContractType();
  const formik = useFormik<ContractTypeCreateReqDto>({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Geef alstublieft de naam op"),
    }),
    onSubmit: (values, { resetForm }) => {
      createContractType(values, {
        onSuccess: () => {
          resetForm();
        },
      });
    },
  });
  return (
    <FormModal {...props} title={"Beheer Contracttypen"}>
      <FormikProvider value={formik}>
        <form
          onSubmit={formik.handleSubmit}
          className="border-b border-stroke pb-6 mb-6"
        >
          <InputField
            label={"Naam"}
            id={"name"}
            name={"name"}
            className={"mb-6"}
            placeholder={"Voer Naam in"}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            required={true}
          />
          <Button
            disabled={isCreating}
            isLoading={isCreating}
            type={"submit"}
            formNoValidate={true}
          >
            Toevoegen
          </Button>
        </form>
      </FormikProvider>
      {isLoading && <Loader />}
      {data?.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-4">Contracttypen</h3>
          <div className="flex flex-col gap-2">
            {data?.map((contractType) => (
              <ContractTypeItem key={contractType.id} {...contractType} />
            ))}
          </div>
        </div>
      )}
      {data?.length === 0 && (
        <p className="text-sm text-gray-2 dark:text-gray-4">
          Geen contracttypen gevonden
        </p>
      )}
    </FormModal>
  );
};

const ContractTypeItem: FunctionComponent<ContractTypeItem> = ({
  name,
  id,
}) => {
  const { mutate: deleteContractType, isLoading } = useDeleteContractType();
  return (
    <div className="flex justify-between items-center border p-4 rounded-lg bg-white border-stroke py-3">
      <p>{name}</p>
      <div className="flex gap-2">
        <IconButton
          onClick={() => deleteContractType(id)}
          buttonType={"Danger"}
          isLoading={isLoading}
        >
          <TrashIcon />
        </IconButton>
      </div>
    </div>
  );
};
