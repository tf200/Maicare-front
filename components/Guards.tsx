"use client";
import { useEffect, useState } from "react";
import { usePathname, redirect } from "next/navigation";
import { useMyInfo } from "@/utils/user-info/getUserInfo";
import { useIsActive } from "@/components/SecureWrapper";
import * as consts from "@/consts";
import { Permission } from "@/types/permissions";

const getPermissionByPathname = (pathname: string): Permission => {
  if (pathname === "" || pathname === "/") {
    return consts.DASHBOARD_VIEW;
  }
  if (pathname.startsWith("/dashboard")) {
    return consts.DASHBOARD_VIEW;
  }
  if (pathname.startsWith("/clients")) {
    return consts.CLIENT_VIEW;
  }
  if (pathname.startsWith("/employees")) {
    return consts.EMPLOYEE_VIEW;
  }
  if (pathname.startsWith("/finances")) {
    return consts.FINANCE_VIEW;
  }
  if (pathname.startsWith("/contacts")) {
    return consts.CONTACTS_VIEW;
  }
  if (pathname.startsWith("/contracts")) {
    return consts.CONTRACTS_VIEW;
  }
  if (pathname.startsWith("/care-plans")) {
    return consts.CARE_PLANS_VIEW;
  }
  if (pathname.startsWith("/tasks")) {
    return consts.TASKS_VIEW;
  }
  if (pathname.startsWith("/conversations")) {
    return consts.CONVERSATION_VIEW;
  }
  if (pathname.startsWith("/locations")) {
    return consts.LOCATION_VIEW;
  }
  if (pathname.startsWith("/profile")) {
    return consts.VIEW_OWN_PROFILE;
  }
};

const Guards: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathName = usePathname();
  const isActive = useIsActive();
  const [isAllowed, setIsAllowed] = useState(false);

  const { refetch } = useMyInfo(false);

  const verify = async () => {
    await refetch();

    if (isActive(getPermissionByPathname(pathName))) {
      setIsAllowed(true);
    }
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      if (localStorage.getItem("a") && pathName.startsWith("/signin")) {
        redirect("/dashboard");
      } else if (localStorage.getItem("a")) {
        verify();
      } else if (pathName.startsWith("/signin")) {
        setIsAllowed(true);
      } else {
        redirect("/signin");
      }
    }
  }, [pathName, isActive]);

  return isAllowed ? children : <></>;
};

export default Guards;
