"use client";

import React, { FunctionComponent, useMemo } from "react";
import { FormikProvider, useFormik } from "formik";
import { useCreateContract } from "@/utils/contracts/createContract";
import {
  COMPANY_CONTRACT_OPTIONS,
  CompanyContractType,
  ContractFormType,
  FINANCING_LAW_TYPES,
  FINANCING_OPTION_TYPES,
  HOURS_TERM_TYPES,
} from "@/types/contracts/contract-form-type";
import * as Yup from "yup";
import {
  AGREEMENT_FILES_TAGS,
  CARE_RATE_BY_TYPE,
  CARE_RATE_OPTIONS_BY_TYPE,
  CARE_TYPE_ARRAY,
  CARE_TYPE_OPTIONS,
  FINANCING_LAW_OPTIONS,
  FINANCING_OPTION_OPTIONS,
  HOURS_TERM_OPTIONS,
  RATE_TYPE_ARRAY,
} from "@/consts";
import InputField from "@/components/FormFields/InputField";
import Select from "@/components/FormFields/Select";
import Button from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import { useClientContact } from "@/components/clientDetails/ContactSummary";
import InfoIcon from "@/components/icons/InfoIcon";
import { useModal } from "@/components/providers/ModalProvider";
import { GenericSelectionOption } from "@/types/selection-option";
import dayjs from "dayjs";
import { dateFormat } from "@/utils/timeFormatting";
import FilesUploader from "@/components/FormFields/FilesUploader";
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
import { ContractTypeCreateReqDto, ContractTypeItem } from "@/types/contract-type";
import IconButton from "@/components/buttons/IconButton";
import TrashIcon from "@/components/icons/TrashIcon";
import Loader from "@/components/common/Loader";
import FormikCheckboxItem from "@/components/FormFields/FormikCheckboxItem";
import { formToDto } from "@/utils/contracts/formToDto";
import ContactAssignment from "@/components/ContactAssignment";
import { useClientDetails } from "@/utils/clients/getClientDetails";

const initialValues: ContractFormType = {
  start_date: "",
  end_date: "",
  care_type: "",
  rate_type: "",
  rate_value: "",
  added_attachments: [],
  removed_attachments: [],
  reminder_period: "",
  tax: "",
  contract_name: "",
  type: "",
  is_default_tax: true,
  status: "draft",
  financing_act: "",
  financing_option: "",
  hours_type: "",
  hours: "",
};

export const contractSchema: Yup.ObjectSchema<ContractFormType> = Yup.object().shape({
  start_date: Yup.string().required("Geef alstublieft de startdatum op"),
  end_date: Yup.string().required("Geef alstublieft de startdatum op"),
  care_type: Yup.string().oneOf(CARE_TYPE_ARRAY).required("Geef alstublieft het zorgtype op"),
  rate_type: Yup.string()
    .oneOf(RATE_TYPE_ARRAY)
    .test("valid_rate_type", "Geef alstublieft het tarieftype op", (value, ctx) => {
      if (value && ctx.parent.care_type) {
        return CARE_RATE_BY_TYPE[ctx.parent.care_type]?.includes(value) ?? false;
      }
      return false;
    })
    .required("Geef alstublieft het tarieftype op"),
  rate_value: Yup.string().required("Geef alstublieft het tarief op"),
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
  contract_name: Yup.string().required("Geef alstublieft de contractnaam op"),
  type: Yup.string().required("Geef alstublieft het type op"),
  is_default_tax: Yup.boolean(),
  tax: Yup.string().test(
    "required_if_not_default",
    "Geef alstublieft de BTW op",
    function (value, ctx) {
      if (ctx.parent.is_default_tax) {
        return true;
      }
      return !!value;
    }
  ),
  status: Yup.string().oneOf(["draft", "approved", "terminated"]),
  financing_act: Yup.string().oneOf(FINANCING_LAW_TYPES),
  financing_option: Yup.string().oneOf(FINANCING_OPTION_TYPES),
  hours_type: Yup.string().oneOf(HOURS_TERM_TYPES),
  hours: Yup.string(),
});

type PropsType = {
  clientId: number;
} & FormProps<ContractResDto>;

const ContractForm: FunctionComponent<PropsType> = ({ clientId, mode = "add", initialData }) => {
  const parsedInitialValues = useMemo(() => {
    return initialData ? { ...initialValues, ...mapToForm(initialData) } : initialValues;
  }, [initialData]);
  const { mutate: create, isLoading: isCreating } = useCreateContract(clientId);
  const { mutate: update, isLoading: isUpdating } = useUpdateContract(initialData?.id);
  const router = useRouter();
  const { data: contactData } = useClientContact(clientId);
  const onSubmit = (value: ContractFormType) => {
    const method = mode === "add" ? create : update;
    method(formToDto(value, clientId, contactData.id, initialData), {
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

  const { values, handleChange, handleBlur, touched, handleSubmit, errors } = formik;

  const { data: clientData } = useClientDetails(clientId);

  console.log("errors", errors);

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} className="grid gap-10 grid-cols-1 lg:grid-cols-2">
        <div>
          <ContactAssignment
            clientId={clientId}
            data={contactData}
            unassigned={clientData && !clientData.sender}
          />
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
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
            <InputField
              label={"Contractnaam"}
              className={"w-full xl:w-1/2"}
              placeholder={"Voer Contractnaam in"}
              required={true}
              id={"contract_name"}
              value={values.contract_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.contract_name && errors.contract_name && errors.contract_name + ""}
            />
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="xl:w-1/2">
              <ManageContractType />
            </div>
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
                touched.reminder_period && errors.reminder_period && errors.reminder_period + ""
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
              error={touched.start_date && errors.start_date && errors.start_date + ""}
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
              error={touched.end_date && errors.end_date && errors.end_date + ""}
            />
          </div>
          <Select
            className={"w-full mb-4.5"}
            id={"care_type"}
            required={true}
            options={CARE_TYPE_OPTIONS}
            label={"Soort Hulpverlening"}
            placeholder={"Voer Zorgtype in"}
            value={values.care_type}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.care_type && errors.care_type && errors.care_type + ""}
          />
          <div className="mb-6 flex flex-col gap-6 xl:flex-row">
            <Select
              label={"Eenheid"}
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
              error={touched.rate_type && errors.rate_type && errors.rate_type + ""}
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
              error={touched.rate_value && errors.rate_value && errors.rate_value + ""}
            />
          </div>
          <div className="mb-6 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <FormikCheckboxItem
                id="is_default_tax"
                name="is_default_tax"
                label="Standaard BTW (0%)"
              />
            </div>
            <InputField
              name={"tax"}
              id={"tax"}
              required={!values.is_default_tax}
              type={"number"}
              min={0}
              step="0.1"
              label={"BTW percentage"}
              unit={"%"}
              disabled={values.is_default_tax}
              placeholder={"Voer BTW percentage in"}
              value={values.is_default_tax ? "" : values.tax}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.tax && errors.tax && errors.tax + ""}
              className="w-full xl:w-1/2"
            />
          </div>
          <div className="mb-6 flex flex-col gap-6 xl:flex-row">
            <Select
              className="w-full xl:w-1/2"
              id={"financing_act"}
              required={true}
              options={FINANCING_LAW_OPTIONS}
              label={"Financieringswet"}
              placeholder={"Selecteer Financieringswet"}
              value={values.financing_act}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.financing_act && errors.financing_act && errors.financing_act + ""}
            />
            <Select
              className="w-full xl:w-1/2"
              id={"financing_option"}
              required={true}
              options={FINANCING_OPTION_OPTIONS}
              label={"Financieringsoptie"}
              placeholder={"Selecteer Financieringsoptie"}
              value={values.financing_option}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.financing_option && errors.financing_option && errors.financing_option + ""
              }
            />
          </div>
          {values.care_type === "ambulante" && (
            <div className="mb-6 flex flex-col gap-6 xl:flex-row">
              <Select
                className="w-full xl:w-1/2"
                id={"hours_type"}
                options={HOURS_TERM_OPTIONS}
                label={"Uren Term"}
                placeholder={"Selecteer Uren Term"}
                value={values.hours_type}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.hours_type && errors.hours_type && errors.hours_type + ""}
              />
              <InputField
                className="w-full xl:w-1/2"
                id={"hours"}
                type={"number"}
                min={0}
                label={"Uren"}
                placeholder={"Voer Uren in"}
                value={values.hours}
                onChange={handleChange}
                onBlur={handleBlur}
                unit={"uur"}
                error={touched.hours && errors.hours && errors.hours + ""}
              />
            </div>
          )}
        </div>
        <div>
          <div className="mb-6">
            <WhenNotification values={values} />
          </div>
          <FilesUploader
            label={"Bestanden"}
            name={"added_attachments"}
            id={"added_attachments"}
            endpoint={"global_v2"}
            tagOptions={AGREEMENT_FILES_TAGS}
            tagLabel={"Bijlagelabel:"}
          />
          {mode === "update" && initialData?.attachments && (
            <FilesDeleter
              alreadyUploadedFiles={initialData.attachments}
              name={"removed_attachments"}
              id={"removed_attachments"}
              tagOptions={AGREEMENT_FILES_TAGS}
              tagLabel={"Bijlagelabel:"}
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

export const WhenNotification: FunctionComponent<{
  values: ContractFormType;
}> = ({ values }) => {
  if (values.end_date && values.start_date && values.reminder_period) {
    const reminderDate = dayjs(values.end_date).subtract(+values.reminder_period, "days").toDate();
    return (
      <div className="flex flex-col gap-2 px-4 py-3 info-box">
        <p>
          <InfoIcon className="inline-block relative -top-0.5" /> <strong>Herinnering:</strong> U
          ontvangt een herinnering op {dateFormat(reminderDate)}
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
          Beheer contracttypen? <div className="inline-block text-primary">Klik hier!</div>
        </span>
      </p>
    </button>
  );
};

const ManageContractTypeModal: FunctionComponent<ModalProps> = ({ additionalProps, ...props }) => {
  const { data, isLoading } = useContractTypes();
  const { mutate: createContractType, isLoading: isCreating } = useCreateContractType();
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
        <form onSubmit={formik.handleSubmit} className="border-b border-stroke pb-6 mb-6">
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
              <ContractItem key={contractType.id} {...contractType} />
            ))}
          </div>
        </div>
      )}
      {data?.length === 0 && (
        <p className="text-sm text-gray-2 dark:text-gray-4">Geen contracttypen gevonden</p>
      )}
    </FormModal>
  );
};

const ContractItem: FunctionComponent<ContractTypeItem> = ({ name, id }) => {
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
