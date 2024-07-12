import { cn } from "@/utils/cn";
import { icons, LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { lazy, Suspense, memo } from "react";

type IconProps = Omit<LucideProps, "iconNode" | "ref"> & {
  name: keyof typeof dynamicIconImports;
};

export default memo(function Icon({ name, className, ...props }: IconProps) {
  const LucideIcon = lazy(dynamicIconImports[name]);

  if (!LucideIcon) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <LucideIcon {...props} className={cn("inline-block mx-1", className)} />
    </Suspense>
  );
});
