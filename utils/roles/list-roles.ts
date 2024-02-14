import api from "@/utils/api";
import { useQuery } from "react-query";
import { RoleListResDto } from "@/types/roles/role-list-res.dto";

async function listRoles(): Promise<RoleListResDto> {
  const response = await api.get<RoleListResDto>("ad/groups/");
  return response.data;
}

export const useListRoles = () => {
  return useQuery({
    queryFn: listRoles,
    queryKey: ["roles"],
  });
};
