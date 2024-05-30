import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

type Auth = {
  uuid: string;
  passkey: string;
};

const fetchProtectedEmail = async (auth: Auth) => {
  const response = await api.post(`/system/protected-email/${auth.uuid}`, {
    passkey: auth.passkey,
  });
  return response.data;
};

export const useGetProtectedEmail = () => {
  return useMutation((auth: Auth) => fetchProtectedEmail(auth));
};
