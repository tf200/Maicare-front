import { ContactResDto } from "@/types/op-contact/contact-res.dto";

export type ContactItem = ContactResDto;
export type ContactsListResDto = Paginated<ContactItem>;
