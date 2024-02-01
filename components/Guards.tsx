"use client";
import { usePathname, redirect, useRouter } from "next/navigation";

const Guards: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathName = usePathname();

  if (typeof window !== "undefined") {
    if (localStorage.getItem("a") && pathName.startsWith("/signin")) {
      redirect("/dashboard/crm");
    } else if (localStorage.getItem("a") || pathName.startsWith("/signin")) {
      return children;
    } else {
      redirect("/signin");
    }
  } else {
    router.push("/signin");
  }
};

export default Guards;
