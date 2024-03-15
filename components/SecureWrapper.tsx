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
import { BEHAVIORAL_SPECIALIST, PERMISSION_CONFIGURATIONS } from "@/consts";

export const useIsActive = () => {
  
  const mockUserRoles: Role[] =  jwt.decode(localStorage.getItem("a"))?.groups

  return useCallback(
    (permission: Permission) => {
      return mockUserRoles.some((role) => PERMISSION_CONFIGURATIONS[role].includes(permission))
    },
    [mockUserRoles]
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
