import api from "@/utils/api";
import { useQuery } from "react-query";

export type UserInfoResDto = {
  user: number;
  id?: number; // Employee id
  client_id?: number;
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

async function getMyInfo() {
  const response = await api.get<UserInfoResDto>("/employee/profile/");

  return response.data;
}

async function getUserInfo(userId: number) {
  const response = await api.get<UserInfoResDto>(
    `/employee/convfilter/${userId}/`
  );

  return response.data;
}

export const useMyInfo = (enabled = true) => {
  return useQuery(["user"], () => getMyInfo(), {
    refetchOnWindowFocus: false,
    enabled,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};

export const useUserInfo = (userId?: number) => {
  return useQuery(["user", userId], () => getUserInfo(userId), {
    refetchOnWindowFocus: false,
    enabled: !!userId,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};
