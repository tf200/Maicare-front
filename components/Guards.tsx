"use client";
import { useEffect, useState } from "react";
import { usePathname, redirect } from "next/navigation";
import api from "@/utils/api";
import { useQuery } from "react-query";

const Guards: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathName = usePathname();

  const [isAllowed, setIsAllowed] = useState(false);

  const { refetch } = useQuery({
    queryFn: () => api.get("/employee/profile/"),
    queryKey: ["user"],
    enabled: false,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const verify = async () => {
    // await refetch();
    setIsAllowed(true);
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      if (localStorage.getItem("a") && pathName.startsWith("/signin")) {
        redirect("/dashboard/crm");
      } else if (localStorage.getItem("a")) {
        verify();
      } else if (pathName.startsWith("/signin")) {
        setIsAllowed(true);
      } else {
        redirect("/signin");
      }
    }
  }, [pathName]);

  return isAllowed ? children : <></>;
};

export default Guards;
