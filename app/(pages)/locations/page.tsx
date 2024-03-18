"use client";

import React, { FunctionComponent, useMemo } from "react";
import Panel from "@/components/Panel";
import { LocationItem } from "@/types/locations/location.dto";
import { ColumnDef } from "@tanstack/react-table";
import Loader from "@/components/common/Loader";
import Table from "@/components/Table";
import { useLocations } from "@/utils/locations";
import LinkButton from "@/components/buttons/LinkButton";

const Page: FunctionComponent = (props) => {
  return (
    <Panel
      title={"Locaties"}
      sideActions={<LinkButton href="/locations/new" text="Nieuwe locatie" />}
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
