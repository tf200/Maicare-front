"use client";

import React, { FunctionComponent, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/table-core";
import LinkButton from "@/components/buttons/LinkButton";
import Loader from "@/components/common/Loader";
import PaginatedTable from "@/components/PaginatedTable";
import { fullDateFormat } from "@/utils/timeFormatting";
import Panel from "@/components/Panel";
import { NewIncidentType } from "@/types/incidents";
import { EMPTY_STRING, SEVERITY_OF_INCIDENT_OPTIONS, TYPES_INCIDENT_OPTIONS } from "@/consts";
import {
  useGetAllIncidents,
  useGetClientIncidentsOrAll,
  useGetIncidentList,
} from "@/utils/new-incident/useGetIncidentList";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import ClientSelector from "@/components/FormFields/comboboxes/ClientSelector";
import { Formik } from "formik";
import Button from "@/components/buttons/Button";

type Props = {};

const IncidentsPage: FunctionComponent<Props> = () => {
  const [filters, setFilters] = useState<IncidentFilterFormType>({
    clientId: 0,
  });
  const { data, pagination, isError, isLoading, isFetching } = useGetClientIncidentsOrAll(
    filters.clientId
  );

  const getSelectedLabels = (options, value) => {
    const option = options.find((obj) => obj.value === value);
    return option ? option.label : EMPTY_STRING;
  };

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet u zeker dat u dit incident wilt verwijderen?",
      title: "Incident verwijderen",
    })
  );

  const columnDef = useMemo<ColumnDef<NewIncidentType>[]>(() => {
    return [
      {
        accessorKey: "employee_fullname",
        header: "Naam betrokken",
      },
      {
        accessorKey: "incident_date",
        header: "Datum ontstaan",
      },
      {
        accessorKey: "runtime_incident",
        header: "Runtime incident ",
      },
      {
        accessorKey: "incident_type",
        header: "Type incident ",
        cell: (info) => getSelectedLabels(TYPES_INCIDENT_OPTIONS, info.getValue()),
      },
      {
        accessorKey: "severity_of_incident",
        header: "ernst incident",
        cell: (info) => getSelectedLabels(SEVERITY_OF_INCIDENT_OPTIONS, info.getValue()),
      },
      {
        accessorKey: "created",
        header: "gemaakt bij",
        cell: (info) => fullDateFormat(info.getValue() as string),
      },
    ];
  }, []);

  return (
    <Panel title={"Incidenten"}>
      <IncidentFilter onSubmit={setFilters} />
      {isLoading && <Loader />}
      {data && (
        <PaginatedTable
          data={data}
          columns={columnDef}
          page={pagination.page ?? 1}
          isFetching={isFetching}
          onPageChange={(page) => pagination.setPage(page)}
        />
      )}
      <div className="flex flex-wrap justify-between items-center p-4"></div>
      {isError && (
        <p role="alert" className="text-red">
          Sorry, er is een fout opgetreden waardoor we dit niet konden laden.
        </p>
      )}
    </Panel>
  );
};

export default IncidentsPage;

type IncidentFilterFormType = {
  clientId: number;
};

type IncidentFilterProps = {
  onSubmit: (values: IncidentFilterFormType) => void;
};

const initialFilter: IncidentFilterFormType = {
  clientId: 0,
};

function IncidentFilter({ onSubmit }: IncidentFilterProps) {
  return (
    // set the value of the client id to 0
    <Formik initialValues={initialFilter} onSubmit={onSubmit}>
      {({ handleSubmit, setValues, values }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap items-end gap-4 px-7 py-4">
            <ClientSelector name={"clientId"} />
            <Button type="submit">Zoeken</Button>
            <Button
              type="button"
              onClick={() => {
                setValues(initialFilter);
                onSubmit(initialFilter);
              }}
            >
              helder filter
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}
