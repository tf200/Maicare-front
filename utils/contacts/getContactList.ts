import { PaginationParams } from "@/types/pagination-params";
import api from "@/utils/api";
import { ContactsListResDto } from "@/types/op-contact/contact-list-res.dto";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { useQuery } from "react-query";

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
