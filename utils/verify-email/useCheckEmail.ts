import api from "@/utils/api";
import { useQuery } from "react-query";

const checkEmail = (verificationId: string) => {
  const response = api.get(`/system/verify-network-email/${verificationId}`);
  return response;
};

export const useCheckEmail = (verificationId) => {
  const data = useQuery({
    queryKey: "email-check",
    queryFn: () => checkEmail(verificationId),
    retry: 2,
  });

  return data;
};
