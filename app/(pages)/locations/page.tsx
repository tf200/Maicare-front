"use client";

import React, { FunctionComponent, useMemo } from "react";
import Panel from "@/components/Panel";
import {
  CreateLocationReqDto,
  LocationItem,
} from "@/types/locations/location.dto";
import { ColumnDef } from "@tanstack/react-table";
import Loader from "@/components/common/Loader";
import Table from "@/components/Table";
import { useCreateLocation, useLocations } from "@/utils/locations";
import Button from "@/components/buttons/Button";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import { useModal } from "@/components/providers/ModalProvider";
import { useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import Textarea from "@/components/FormFields/Textarea";
import * as yup from "yup";

const initialValue: CreateLocationReqDto = {
  name: "",
  address: "",
};

const validationSchema: yup.ObjectSchema<CreateLocationReqDto> = yup.object({
  name: yup.string().required("Naam is verplicht"),
  address: yup.string().required("Adres is verplicht"),
});

const CreateLocationModal: FunctionComponent<ModalProps> = ({
  onClose,
  open,
  additionalProps,
}) => {
  const { mutate, isLoading } = useCreateLocation();
  const { handleSubmit, values, errors, touched, handleChange, handleBlur } =
    useFormik({
      initialValues: initialValue,
      validationSchema,
      onSubmit: (values) => {
        mutate(values, {
          onSuccess: () => {
            onClose();
            additionalProps?.onSuccess?.();
          },
        });
      },
    });
  return (
    <FormModal open={open} onClose={onClose} title={"Nieuwe locatie"}>
      <form onSubmit={handleSubmit}>
        <InputField
          className={"mb-4"}
          label={"Naam"}
          name={"name"}
          required={true}
          value={values.name}
          error={touched.name && errors.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={"Naam"}
        />
        <Textarea
          className={"mb-6"}
          label={"Adres"}
          name={"address"}
          required={true}
          rows={6}
          value={values.address}
          error={touched.address && errors.address}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={"Adres"}
        />
        <Button type={"submit"} isLoading={isLoading} formNoValidate={true}>
          Opslaan
        </Button>
      </form>
    </FormModal>
  );
};

const Page: FunctionComponent = (props) => {
  const { open } = useModal(CreateLocationModal);
  return (
    <Panel
      title={"Locaties"}
      sideActions={
        <Button
          onClick={() => {
            open({});
          }}
        >
          Nieuwe locatie
        </Button>
      }
    >
      <LocationsList />
    </Panel>
  );
};

const LocationsList = () => {
  const { data, isLoading } = useLocations();
  const columnDefs = useMemo<ColumnDef<LocationItem>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: "Naam",
      },
      {
        accessorKey: "address",
        header: "Adres",
      },
    ];
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return null;
  }
  return <Table data={data.results} columns={columnDefs} />;
};

export default Page;
