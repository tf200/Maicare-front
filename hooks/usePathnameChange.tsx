import { EffectCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export const usePathnameChange = (callback: EffectCallback) => {
  const pathname = usePathname();
  const ref = useRef(pathname);
  useEffect(() => {
    if (!ref.current) {
      ref.current = pathname;
      return;
    }
    if (ref.current !== pathname) {
      ref.current = pathname;
      return callback();
    }
  }, [pathname]);
};
