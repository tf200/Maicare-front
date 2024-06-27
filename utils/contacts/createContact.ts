import { useMutation, useQueryClient } from "react-query";
import { NewContactReqDto } from "@/types/new-contact-req.dto";
import api from "@/utils/api";
import { ContactResDto } from "@/types/op-contact/contact-res.dto";

async function createOpOrgContact(values: NewContactReqDto) {
  const response = await api.post<ContactResDto>("client/sender_create/", values);
  return response.data;
}

export const useCreateOpOrgContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOpOrgContact,
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });
};

async function updateOpOrgContact(id: number, values: NewContactReqDto) {
  const response = await api.post<ContactResDto>(`client/sender_update/${id}/`, values);
  return response.data;
}

export function useUpdateOpOrgContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: NewContactReqDto }) =>
      updateOpOrgContact(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });
}
