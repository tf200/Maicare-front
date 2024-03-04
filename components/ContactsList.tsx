"use client";

import React, { FunctionComponent, useMemo } from "react";
import api from "@/utils/api";
import { useQuery } from "react-query";
import { ContactResDto } from "@/components/FormFields/OpContactForms/OpContactForm";
import PaginatedTable from "@/components/PaginatedTable";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { ColumnDef } from "@tanstack/react-table";

type ContactItem = ContactResDto;
type ContactsListResDto = Paginated<ContactItem>;

async function getContacts() {
  const response = await api.get<ContactsListResDto>("client/senders/");
  return response.data;
}

const useContacts = () => {
  const paginationParams = usePaginationParams();
  const query = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  return {
    ...query,
    pagination: paginationParams,
  };
};

const ContactsList: FunctionComponent = (props) => {
  const { data, pagination } = useContacts();
  const columns = useMemo<ColumnDef<ContactItem>[]>(() => {
    return [
      {
        header: "Naam",
        accessorKey: "name",
      },
      {
        header: "Adres",
        accessorKey: "address",
      },
      {
        header: "Postcode",
        accessorKey: "postal_code",
      },
      {
        header: "Plaats",
        accessorKey: "place",
      },
      {
        header: "Land",
        accessorKey: "land",
      },
      {
        header: "Telefoonnummer",
        accessorKey: "phone_number",
      },
      {
        header: "KVK Nummer",
        accessorKey: "KVKnumber",
      },
      {
        header: "BTW Nummer",
        accessorKey: "BTWnumber",
      },
    ];
  }, []);
  return (
    <div>
      {data && (
        <PaginatedTable
          columns={columns}
          data={data}
          page={pagination.page}
          onPageChange={pagination.setPage}
        ></PaginatedTable>
      )}
    </div>
  );
};

export default ContactsList;
