"use client";
import { useEffect, useState } from "react";
import { usePathname, redirect } from "next/navigation";
import api from "@/utils/api";
import { useQuery } from "react-query";

const Guards: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathName = usePathname();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { refetch } = useQuery({
    queryFn: () => api.get("/employee/profile/"),
    queryKey: ["user"],
    enabled: false,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const getUserData = async () => {
    await refetch();
    setIsAuthenticated(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("a") && pathName.startsWith("/signin")) {
        redirect("/dashboard/crm");
      } else if (localStorage.getItem("a") || pathName.startsWith("/signin")) {
        getUserData();
      } else {
        redirect("/signin");
      }
    }
  }, [pathName]);

  return isAuthenticated ? children : <></>;
};

export default Guards;
