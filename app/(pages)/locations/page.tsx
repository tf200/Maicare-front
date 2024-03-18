"use client";

import React, { FunctionComponent, useMemo } from "react";
import Panel from "@/components/Panel";
import api from "@/utils/api";
import { useQuery } from "react-query";
import { LocationItem, LocationsResDto } from "@/types/locations/location.dto";
import { ColumnDef } from "@tanstack/react-table";
import Loader from "@/components/common/Loader";
import Table from "@/components/Table";

const Page: FunctionComponent = (props) => {
  return (
    <Panel title={"Locaties"}>
      <LocationsList />
    </Panel>
  );
};

async function getLocations() {
  const response = await api.get<LocationsResDto>("/locations/");
  return response.data;
}

const useLocations = () => {
  const query = useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  });

  return query;
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
