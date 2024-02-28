import api from "@/utils/api";
import { useQuery } from "react-query";

export type UserInfoResDto = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
  phone_number: string;
  profile: {
    position: string;
    department: string;
  };
};

async function getUserInfo() {
  const response = await api.get<UserInfoResDto>("/employee/profile/");

  return response.data;
}

export const useUserInfo = (enabled = true) => {
  return useQuery(["user"], getUserInfo, {
    refetchOnWindowFocus: false,
    enabled,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};
