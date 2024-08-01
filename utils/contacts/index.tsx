import api from "@/utils/api";
import { UpdateContactReqDto } from "@/types/contacts";
import { ContactResDto } from "@/types/op-contact/contact-res.dto";

async function updateContact(contactId: number, values: UpdateContactReqDto) {
  const response = await api.patch<ContactResDto>(`client/sender_update/${contactId}/`, values);
  return response.data;
}
