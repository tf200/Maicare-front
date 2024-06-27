import { useContacts } from "@/utils/contacts/getContactList";

// This hook is used to get the contact details of the sender
export default function useSenderContact(contactId: number) {
  // get contact by id
  const { data, ...rest } = useContacts(null, { page: 1, page_size: 100000 });

  const senderContact = data?.results?.find((contact) => contact.id === contactId);

  return { data: senderContact, ...rest };
}
