"use client";

import React, { FunctionComponent, useMemo, useState } from "react";
import Panel from "@/components/Panel";
import {
  useClientStates,
  useCreateClientState,
  useDeleteClientState,
  useUpdateClientState,
} from "@/utils/client_states";
import { ColumnDef } from "@tanstack/react-table";
import { ClientStateResDto } from "@/types/client_states";
import PaginatedTable from "@/components/PaginatedTable";
import { dateFormat } from "@/utils/timeFormatting";
import Button from "@/components/buttons/Button";
import FormModal from "@/components/Modals/FormModal";
import { ModalProps } from "@/types/modal-props";
import { Formik, FormikProvider, useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import Textarea from "@/components/FormFields/Textarea";
import RatingStars from "@/components/FormFields/RatingStars";
import { useModal } from "@/components/providers/ModalProvider";
import ToolbarButtonsGroup from "@/components/buttons/ToolbarButtonsGroup";
import { FormProps } from "@/types/form-props";
import IconButton from "@/components/buttons/IconButton";
import PencilSquare from "@/components/icons/PencilSquare";
import dayjs from "dayjs";
import TrashIcon from "@/components/icons/TrashIcon";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import { Trash } from "lucide-react";

type StateType = "physical" | "emotional";

const STATE_RECORD = {
  physical: "Fysieke toestand",
  emotional: "Emotionele toestand",
};

const Page: FunctionComponent<{
  params: { clientId: string };
}> = ({ params: { clientId } }) => {
  const { data, pagination, isLoading, isFetching } = useClientStates(+clientId);
  const { mutate: deleteState } = useDeleteClientState();
  const { open: openDeleteConfirmation } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet je zeker dat je deze toestand wilt verwijderen?",
      title: "Verwijderen",
    })
  );
  const columnDef = useMemo<ColumnDef<ClientStateResDto>[]>(() => {
    return [
      {
        header: "Datum",
        accessorKey: "created",
        cell: (row) => dateFormat(row.getValue() as string),
      },
      {
        header: "Type",
        accessorKey: "type",
        cell: (row) => STATE_RECORD[row.getValue() as StateType],
      },
      {
        header: "Evaluatie",
        accessorKey: "value",
      },
      {
        header: "Opmerkingen",
        accessorKey: "content",
      },
      {
        id: "actions",
        header: "",
        cell: ({ row: { original } }) => (
          <div className="flex gap-2 justify-end">
            <IconButton
              onClick={() => {
                open({
                  clientId: +clientId,
                  initialData: original,
                  mode: "edit",
                });
              }}
            >
              <PencilSquare className={"w-4.5 h-4.5"} />
            </IconButton>
            <IconButton
              className="bg-red-500"
              onClick={() => {
                openDeleteConfirmation({
                  onConfirm: () => {
                    deleteState(original.id);
                  },
                });
              }}
            >
              <Trash className={"w-5 h-5"} />
            </IconButton>
          </div>
        ),
      },
    ];
  }, []);
  const { open } = useModal(StateModal);
  return (
    <Panel
      title={"Fysieke en emotionele toestand"}
      sideActions={
        <Button
          onClick={() => {
            open({
              clientId: +clientId,
            });
          }}
        >
          Toevoegen
        </Button>
      }
    >
      {data && (
        <PaginatedTable
          data={data}
          columns={columnDef}
          page={pagination.page}
          onPageChange={pagination.setPage}
          isFetching={isFetching}
        />
      )}
    </Panel>
  );
};

export default Page;

const StateModal: FunctionComponent<ModalProps> = ({ additionalProps, ...props }) => {
  const { initialData: clientState, mode = "add" }: FormProps<ClientStateResDto> = additionalProps;
  const { mutate: create, isLoading: isCreating } = useCreateClientState(additionalProps.clientId);
  const { mutate: update, isLoading: isUpdating } = useUpdateClientState(clientState?.id);
  const formik = useFormik({
    initialValues: {
      type: clientState?.type || "physical",
      created: clientState?.created ? dayjs(clientState?.created).format("YYYY-MM-DD") : "",
      value: clientState?.value || 0,
      content: clientState?.content || "",
    },
    onSubmit: (values) => {
      if (mode === "add") {
        create(
          {
            ...values,
            client_id: additionalProps.clientId,
          },
          {
            onSuccess: () => {
              props.onClose();
            },
          }
        );
      } else {
        update(values, {
          onSuccess: () => {
            props.onClose();
          },
        });
      }
    },
  });

  const { values, setFieldValue, handleBlur, handleChange, handleSubmit } = formik;

  return (
    <FormModal
      {...props}
      title={values.type === "physical" ? "Fysieke toestand" : "Emotionele toestand"}
    >
      {mode === "add" && (
        <div className="flex justify-end mb-6">
          <ToolbarButtonsGroup
            options={[
              { label: "Fysiek", value: "physical" },
              { label: "Emotioneel", value: "emotional" },
            ]}
            selectedOption={values.type}
            onOptionClicked={(v) => {
              setFieldValue("type", v.value);
            }}
          />
        </div>
      )}
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <InputField
            type="date"
            name="created"
            label={"Datum"}
            className="mb-4"
            required={true}
            value={values.created}
            onChange={handleChange}
            onBlur={handleBlur}
            max={dayjs().format("YYYY-MM-DD")}
          />
          <RatingStars
            required={true}
            label={values.type === "physical" ? "Fysieke toestand" : "Emotionele toestand"}
            name="value"
            className="mb-4"
          />
          <Textarea
            label={"Opmerkingen"}
            name="content"
            className="mb-6"
            value={values.content}
            onChange={handleChange}
            onBlur={handleBlur}
            required={true}
            placeholder={
              values.type === "physical" ? "Hoe voel je je vandaag?" : "Wat houdt je bezig?"
            }
            rows={6}
          />
          <div className="flex justify-center gap-4 items-center">
            <Button buttonType={"Outline"} onClick={props.onClose}>
              Annuleren
            </Button>
            <Button
              isLoading={isCreating || isUpdating}
              disabled={isCreating || isUpdating}
              type="submit"
            >
              Toevoegen
            </Button>
          </div>
        </form>
      </FormikProvider>
    </FormModal>
  );
};
