"use client";

import {
  ComponentProps,
  createElement,
  type ElementType,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useMemo,
} from "react";
import jwt from "jsonwebtoken";
import { Permission, Role } from "@/types/permissions";
import { DASHBOARD_VIEW, PERMISSION_CONFIGURATIONS } from "@/consts";
import { useQuery } from "react-query";
import api from "@/utils/api";
import { useMyInfo } from "@/utils/user-info/getUserInfo";

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

async function getPermissions(employeeId: number) {
  const response = await api.get<Permission[]>(`/system/administration/permissions/${employeeId}`);

  return response.data;
}

export const usePermissions = (employeeId?: number, enabled: boolean = true) => {
  return useQuery(["permissions", employeeId], () => getPermissions(employeeId), {
    refetchOnWindowFocus: false,
    enabled: !!employeeId || enabled,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};

export const useMyPermissions = () => {
  const { data: myInfos } = useMyInfo();
  const { data: permissionData } = usePermissions(myInfos.id);

  return { permissionData };
};

export const useIsActive = () => {
  const { data: myInfo } = useMyInfo();
  const { data: permissions } = usePermissions(myInfo?.id);
  return useCallback(
    (permission: Permission) => {
      if (permission === DASHBOARD_VIEW) {
        return true;
      }
      return permissions?.includes(permission) ?? false;
    },
    [permissions]
  );
};

export const useGuardIsActive = () => {
  const { data: myInfo, refetch: fetchInfo } = useMyInfo(false);
  const { data: permissions, refetch: fetchPermissions } = usePermissions(myInfo?.id, false);
  const isActive = useCallback(
    (permission: Permission) => {
      if (permission === DASHBOARD_VIEW) {
        return true;
      }
      return permissions?.includes(permission) ?? false;
    },
    [permissions]
  );
  return {
    isActive,
    fetchPermissions: async () => {
      await fetchInfo();
      return fetchPermissions();
    },
  };
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
