"use client";
import { usePathname, useRouter } from "next/navigation";

const Guards: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathName = usePathname();

  if (typeof window !== "undefined") {
    if (localStorage.getItem("a") && pathName.startsWith("/signin")) {
      router.push("/dashboard/crm");
    } else if (localStorage.getItem("a") || pathName.startsWith("/signin")) {
      return children;
    } else {
      router.push("/signin");
    }
  } else {
    return <></>;
  }
};

export default Guards;
