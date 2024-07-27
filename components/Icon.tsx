"use client";

import { cn } from "@/utils/cn";
import { icons, LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { lazy, Suspense, memo } from "react";

type IconProps = Omit<LucideProps, "iconNode" | "ref"> & {
  name: keyof typeof dynamicIconImports;
};

export default memo(function Icon({ name, className, size = 24, ...props }: IconProps) {
  const LucideIcon = lazy(dynamicIconImports[name]);

  if (!LucideIcon) {
    return null;
  }

  return (
    <Suspense
      fallback={
        <span className={cn(`inline-block mx-1 w-[${size}px] h-[${size}px]`, className)}></span>
      }
    >
      <LucideIcon {...props} className={cn("inline-block mx-1", className)} size={size} />
    </Suspense>
  );
});
