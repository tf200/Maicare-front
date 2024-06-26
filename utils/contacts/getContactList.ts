import { PaginationParams } from "@/types/pagination-params";
import api from "@/utils/api";
import { ContactsListResDto } from "@/types/op-contact/contact-list-res.dto";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { useQuery } from "react-query";
import { PaginationResult } from "@/types/pagination-result";

type GetContactsParams = PaginationParams & {
  search?: string;
};

async function getContacts(params: GetContactsParams) {
  const response = await api.get<ContactsListResDto>("client/senders/", {
    params,
  });
  return response.data;
}

export const useContacts = (
  search?: string,
  pagination_params?: {
    page?: number;
    page_size?: number;
  }
) => {
  const paginationParams = usePaginationParams();

  const params = {
    ...{ ...paginationParams.params, ...pagination_params },
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
