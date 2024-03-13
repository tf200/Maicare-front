import {
  ComponentProps,
  createElement,
  type ElementType,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
} from "react";
import { Permission, Role } from "@/types/permissions";
import { CAREGIVER, PERMISSION_CONFIGURATIONS } from "@/consts";

const useIsActive = () => {
  const mockUserRole: Role = CAREGIVER;
  return useCallback(
    (permission: Permission) => {
      return PERMISSION_CONFIGURATIONS[mockUserRole].includes(permission);
    },
    [mockUserRole]
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
