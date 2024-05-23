"use client";

import * as Yup from "yup";
import React, { FC, FunctionComponent, useCallback, useEffect } from "react";
import { useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import Select from "@/components/FormFields/Select";
import {
  EMERGENCY_DISTANCE_OPTIONS,
  EMERGENCY_RELATION_OPTIONS,
} from "@/consts";
import { useCreateEmergencyContact } from "@/utils/emergency/createEmergencyContact";
import Button from "@/components/buttons/Button";
import CheckBoxInputFieldThin from "../FormFields/CheckBoxInputThin";
import { useRouter } from "next/navigation";
import { usePatchEmergencyContact } from "@/utils/emergency/patchEmergencyContact";
import { useGetEmergency } from "@/utils/emergency/getEmergency";
import { useModal } from "../providers/ModalProvider";
import FormModal from "../Modals/FormModal";
import { ModalProps } from "@/types/modal-props";
import { useCreateRelationship, useRelationshipList, useDeleteRelationship } from "@/utils/emergency/EmergencyRelationship";
import { SelectionOption } from "@/types/selection-option";

type PropsType = {
  clientId: number;
  emergencyId?: number;
  mode: string;
};

type FormTypes = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  relationship: string;
  relation_status: string;
  address: string;
  medical_reports: boolean;
  goals_reports: boolean;
  incidents_reports: boolean;
};

const initialValues: FormTypes = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  relationship: "",
  relation_status: "",
  address: "",
  medical_reports: false,
  goals_reports: false,
  incidents_reports: false,
};

export const EmergencyContactForm: FunctionComponent<PropsType> = ({
  clientId,
  emergencyId,
  mode,
}) => {
  const router = useRouter();
  // use a Modal to add a new relationship
  const { open } = useModal(NewRelationShip)

  const {
    data,
    isLoading: isDataLoading,
    isError,
  } = useGetEmergency(emergencyId, clientId);

  const { isLoading: isLoadingRelationships, data: relationships } = useRelationshipList()

  const { mutate: create, isLoading: isCreating } =
    useCreateEmergencyContact(clientId);
  const { mutate: update, isLoading: isPatching } =
    usePatchEmergencyContact(clientId);

  const onSubmit = useCallback(
    (values: FormTypes, { resetForm }) => {
      if (mode === "edit") {
        update(
          {
            ...values,
            id: emergencyId,
          },
          {
            onSuccess: () => {
              resetForm;
              router.push(`/clients/${clientId}/client-network/emergency`);
            },
          }
        );
      } else if (mode === "new") {
        create(values, {
          onSuccess: () => {
            resetForm;
            router.push(`/clients/${clientId}/client-network/emergency`);
          },
        });
      }
    },
    [create, update]
  );

  const formik = useFormik<FormTypes>({
    enableReinitialize: true,
    initialValues:
      mode == "edit" ? (data ? data : initialValues) : initialValues,
    validationSchema: Yup.object({
      first_name: Yup.string().required("Geef alstublieft een voornaam op"),
      last_name: Yup.string().required("Geef alstublieft een achternaam op"),
      email: Yup.string().required("Geef alstublieft een e-mailadres op"),
      phone_number: Yup.string().required(
        "Geef alstublieft een telefoonnummer op"
      ),
      relationship: Yup.string().required("Geef alstublieft een relatie op"),
      relation_status: Yup.string().required("Geef alstublieft een afstand op"),
      address: Yup.string().required("Geef alstublieft een adres op"),
      medical_reports: Yup.boolean(),
      goals_reports: Yup.boolean(),
      incidents_reports: Yup.boolean(),
    }),
    onSubmit: onSubmit,
  });

  if (isDataLoading || isLoadingRelationships) return <div className="p-5">Loading...</div>;
  
  const EMERGENCY_RELATIONSHIP_OPTIONS: SelectionOption[] = relationships.map((relationship) => {
    return {
      label: relationship.name,
      value: relationship.id.toString(),
    };
  })

  return (
    <form onSubmit={formik.handleSubmit} className="p-6.5">
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <InputField
          required={true}
          label={"Voornaam"}
          name={"first_name"}
          placeholder={"Voer Voornaam in"}
          type={"text"}
          value={formik.values.first_name}
          className="w-full xl:w-1/2"
          error={
            formik.touched.first_name && formik.errors.first_name
              ? formik.errors.first_name
              : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <InputField
          required={true}
          className={"w-full xl:w-1/2"}
          label={"Achternaam"}
          name={"last_name"}
          type={"text"}
          value={formik.values.last_name}
          placeholder={"Voer Achternaam in"}
          error={
            formik.touched.last_name && formik.errors.last_name
              ? formik.errors.last_name
              : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <InputField
        required={true}
        className={"w-full mb-4.5"}
        label={"E-mailadres"}
        name={"email"}
        type={"text"}
        value={formik.values.email}
        placeholder={"Voer e-mailadres in"}
        error={
          formik.touched.email && formik.errors.email
            ? formik.errors.email
            : null
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />{" "}
      <InputField
        required={true}
        label={"Telefoonnummer"}
        name={"phone_number"}
        placeholder={"Voer telefoonnummer in"}
        type={"text"}
        value={formik.values.phone_number}
        className={"w-full mb-4.5"}
        error={
          formik.touched.phone_number && formik.errors.phone_number
            ? formik.errors.phone_number
            : null
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="mb-1 flex flex-col gap-6 xl:flex-row">
        <Select
          required={true}
          label={"Relatie"}
          name={"relationship"}
          options={EMERGENCY_RELATIONSHIP_OPTIONS}
          className="w-full xl:w-1/2"
          value={formik.values.relationship}
          error={
            formik.touched.relationship && formik.errors.relationship
              ? formik.errors.relationship
              : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Select
          required={true}
          label={"Afstand"}
          name={"relation_status"}
          options={EMERGENCY_DISTANCE_OPTIONS}
          className="w-full xl:w-1/2"
          value={formik.values.relation_status}
          error={
            formik.touched.relation_status && formik.errors.relation_status
              ? formik.errors.relation_status
              : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className="mb-5 pl-2">
        <span className="text-sm font-bold cursor-pointer" onClick={open}>Een nieuwe relatie aanmaken?</span>
      </div>

      <InputField
        required={true}
        className={"w-full mb-4.5"}
        label={"Adres"}
        name={"address"}
        type={"text"}
        value={formik.values.address}
        placeholder={"Voer adres in"}
        error={
          formik.touched.address && formik.errors.address
            ? formik.errors.address
            : null
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <CheckBoxInputFieldThin
        className={"w-full mb-4.5"}
        label={"Medische rapporten automatisch verzenden (wekelijks)?"}
        name={"medical_reports"}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        checked={formik.values.medical_reports}
      />
      <CheckBoxInputFieldThin
        className={"w-full mb-4.5"}
        label={"Voortgangsrapporten automatisch versturen?"}
        name={"goals_reports"}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        checked={formik.values.goals_reports}
      />
      <CheckBoxInputFieldThin
        className={"w-full mb-4.5"}
        label={"Incidentenrapporten automatisch verzenden?"}
        name={"incidents_reports"}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        checked={formik.values.incidents_reports}
      />
      <Button
        type={"submit"}
        disabled={isCreating || isPatching}
        isLoading={isCreating || isPatching}
        formNoValidate={true}
        loadingText={mode === "edit" ? "Bijwerken..." : "Toevoegen..."}
      >
        {mode === "edit" ? "Contact bijwerken" : "Contact indienen"}
      </Button>
    </form>
  );
};

export default EmergencyContactForm;


const NewRelationShip: FC<ModalProps> = ({ additionalProps, ...props }) => {
  const { isLoading, data: relationships } = useRelationshipList()
  const { mutate: createRelationship, isLoading: isCreating } = useCreateRelationship()
  const { mutate: deleteRelationship, isLoading: isLoadingDeletion } = useDeleteRelationship()

  if (isLoading) return <div className="p-5">Loading...</div>

  return (
    <FormModal {...props} title={"Nieuwe relatie"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const name = e.target["name"].value;
          createRelationship({ name });
          e.target["name"].value = "";
          // props.onClose();
        }}
      >
        <InputField
          required={true}
          label={"Naam"}
          name={"name"}
          placeholder={"Naam"}
        />
        <div className="flex gap-4 mt-6 justify-center">
          <Button buttonType={"Outline"} onClick={props.onClose}>
            Annuleren
          </Button>
          <Button isLoading={isCreating} disabled={isCreating} type={"submit"}>
            Opslaan
          </Button>
        </div>

        <div className="my-5 py-5">
          <h4 className="font-bold mb-5">Beschikbare relaties</h4>
          
          <div className="max-h-[400px] overflow-y-auto">
            <table className="table-auto rounded-lg w-full bg-white border-collapse">
              {relationships.map((relationship, i) => {
                return (
                  <tr key={i} className="border-y-1 border-gray">
                    <td className="p-5">{relationship.name}</td>
                    <td><span className="cursor-pointer" title="delete" onClick={(e) => {
                      deleteRelationship(relationship.id)
                    }}>❌</span></td>
                  </tr>
                )
              })}
            </table>
          
          </div>
        </div>

      </form>
    </FormModal>
  );
};