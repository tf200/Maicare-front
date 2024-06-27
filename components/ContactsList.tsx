"use client";

import React, { FunctionComponent, useMemo } from "react";
import PaginatedTable from "@/components/PaginatedTable";
import { ColumnDef } from "@tanstack/react-table";
import styles from "./styles/contacts-list.module.css";
import { ContactItem } from "@/types/op-contact/contact-list-res.dto";
import { useContacts } from "@/utils/contacts/getContactList";
import Link from "next/link";
import IconButton from "./buttons/IconButton";
import PencilSquare from "./icons/PencilSquare";
import DeleteIcon from "./icons/DeleteIcon";

type PersonContact = {
  name: string;
  email: string;
  phone_number: string;
};

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
        cell: (info) => <a href={`tel:${info.getValue()}`}>{info.getValue() as string}</a>,
      },
      {
        header: "KvK Nummer",
        accessorKey: "KVKnumber",
      },
      {
        header: "BTW Nummer",
        accessorKey: "BTWnumber",
      },
      // {
      //   accessorKey: "action",
      //   header: "Actions",
      //   cell: (info) => {
      //     // Show the edit button/link
      //     const senderId = info.row.original.id;
      //     return (
      //       <div className="flex gap-3">
      //         <Link href={`contacts/${senderId}/edit`}>
      //           <IconButton>
      //             <PencilSquare className="w-5 h-5" />
      //           </IconButton>
      //         </Link>
      //       </div>
      //     );
      //   },
      // },
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
          renderRowDetails={(row) => {
            const contacts = row.original.contacts;
            const senderId = row.original.id;

            return (
              <div className="flex">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Naam</th>
                      <th>Email</th>
                      <th>Telefoonnummer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts?.map((contact, index) => (
                      <tr key={index}>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone_number}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Link href={`contacts/${senderId}/edit`}>
                  <IconButton>
                    <PencilSquare className="w-5 h-5" />
                  </IconButton>
                </Link>
              </div>
            );
          }}
        />
      )}
    </div>
  );
};

export default ContactsList;
