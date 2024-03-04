"use client";

import React, { FunctionComponent, useMemo } from "react";
import api from "@/utils/api";
import { useQuery } from "react-query";
import { ContactResDto } from "@/components/FormFields/OpContactForms/OpContactForm";
import PaginatedTable from "@/components/PaginatedTable";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { ColumnDef } from "@tanstack/react-table";
import { PaginationParams } from "@/types/pagination-params";

type ContactItem = ContactResDto;
type ContactsListResDto = Paginated<ContactItem>;

type GetContactsParams = PaginationParams & {
  search?: string;
};

async function getContacts(params: GetContactsParams) {
  const response = await api.get<ContactsListResDto>("client/senders/", {
    params,
  });
  return response.data;
}

export const useContacts = (search?: string) => {
  const paginationParams = usePaginationParams();
  const params = {
    ...paginationParams,
    search,
  };
  const query = useQuery({
    queryKey: ["contacts", params],
    queryFn: () => getContacts(params),
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
        />
      )}
    </div>
  );
};

export default ContactsList;
