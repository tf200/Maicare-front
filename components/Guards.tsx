"use client";
import { useEffect, useState } from "react";
import { usePathname, redirect } from "next/navigation";

const Guards: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathName = usePathname();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("a") && pathName.startsWith("/signin")) {
        redirect("/dashboard/crm");
      } else if (localStorage.getItem("a") || pathName.startsWith("/signin")) {
        setIsAuthenticated(true);
      } else {
        redirect("/signin");
      }
    }
  }, [pathName]);

  return isAuthenticated ? children : <></>;
};

export default Guards;
