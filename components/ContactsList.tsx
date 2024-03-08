"use client";

import React, { FunctionComponent, useMemo } from "react";
import PaginatedTable from "@/components/PaginatedTable";
import { ColumnDef } from "@tanstack/react-table";
import styles from "./styles/contacts-list.module.css";
import { ContactItem } from "@/types/op-contact/contact-list-res.dto";
import { useContacts } from "@/utils/contacts/getContactList";

const ContactsList: FunctionComponent = (props) => {
  const { data, pagination } = useContacts();
  const columns = useMemo<ColumnDef<ContactItem>[]>(() => {
    return [
      {
        header: "Opdrachtgever",
        accessorKey: "name",
      },
      {
        id: "full_address",
        header: "Adres",
        cell: (info) => {
          const { address, postal_code, place, land } = info.row.original;
          return (
            <div>
              <div>
                {address}, {postal_code}
              </div>
              <div>{place}</div>
              <div>{land}</div>
            </div>
          );
        },
      },
      {
        header: "Telefoonnummer",
        accessorKey: "phone_number",
        cell: (info) => (
          <a href={`tel:${info.getValue()}`}>{info.getValue() as string}</a>
        ),
      },
      {
        header: "KvK Nummer",
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
          className={styles.table}
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
