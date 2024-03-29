"use client";
import React, { useEffect, useState } from "react";
import { usePathname, redirect, useRouter } from "next/navigation";
import { useMyInfo } from "@/utils/user-info/getUserInfo";
import { useIsActive } from "@/components/SecureWrapper";
import * as consts from "@/consts";
import { Permission } from "@/types/permissions";
import Loader from "@/components/common/Loader";
import LogoutIcon from "@/components/icons/LogoutIcon";

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
  const router = useRouter();
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

  const [safeHatch, setSafeHatch] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setSafeHatch(true);
    }, 10000);
  }, []);

  return isAllowed ? (
    children
  ) : (
    <div className="h-[100vh] bg-white flex flex-col items-center justify-center">
      <Loader />
      {safeHatch && (
        <button
          onClick={() => {
            localStorage.clear();
            router.push("/");
          }}
          className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <LogoutIcon />
          Als u niet wordt omgeleid, klik hier om uit te loggen en opnieuw in te
          loggen...
        </button>
      )}
    </div>
  );
};

export default Guards;
