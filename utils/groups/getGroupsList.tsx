import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchGroups = () => async () => {
  const res = await api.get(`ad/groups/`);
  return res.data;
};

export const useGroupsList = () => {
  const query = useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups(),
    keepPreviousData: true,
  });

  return {
    ...query,
  };
};
