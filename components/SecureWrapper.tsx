"use client";

import {
  ComponentProps,
  createElement,
  type ElementType,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
} from "react";
import jwt from "jsonwebtoken";
import { Permission, Role } from "@/types/permissions";
import { PERMISSION_CONFIGURATIONS } from "@/consts";
import { useQuery } from "react-query";

const useRoles = () => {
  return useQuery({
    queryKey: "my-roles",
    queryFn: async (): Promise<Role[]> => {
      return new Promise((resolve) => {
        const decoded = jwt.decode(localStorage.getItem("a"))?.groups;
        resolve([...decoded]);
      });
    },
  });
};

export const useIsActive = () => {
  const { data: roles } = useRoles();
  return useCallback(
    (permission: Permission) => {
      return roles?.some((role) =>
        PERMISSION_CONFIGURATIONS[role].includes(permission)
      );
    },
    [roles]
  );
};

type SecureWrapperProps = PropsWithChildren<
  {
    as: ElementType;
    permission: Permission;
  } & ComponentProps<ElementType>
>;

const SecureWrapper: FunctionComponent<SecureWrapperProps> = ({
  as,
  permission,
  children,
  ...props
}) => {
  const isActive = useIsActive();
  return isActive(permission) && createElement(as, props, children);
};

export default SecureWrapper;

export const SecureFragment: FunctionComponent<
  PropsWithChildren<{
    permission: Permission;
  }>
> = ({ children, permission }) => {
  const isActive = useIsActive();
  return isActive(permission) && children;
};
