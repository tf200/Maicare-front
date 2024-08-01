import api from "@/utils/api";
import {
  CreateGroupReqDto,
  GroupDetailsResDto,
  GroupListResDto,
  PermissionsListDto,
  UpdateGroupReqDto,
} from "@/types/permissions";
import { useMutation, useQuery, useQueryClient } from "react-query";

async function getAllPermission() {
  const response = await api.get<PermissionsListDto>("/system/administration/permissions");
  return response.data;
}

export const usePermissions = () => {
  return useQuery("permissions", getAllPermission);
};

async function getGroupDetails(groupId: number) {
  const response = await api.get<GroupDetailsResDto>(`/system/administration/groups/${groupId}`);
  return response.data;
}

export const useGroupDetails = (groupId: number) => {
  return useQuery(["group", groupId], () => getGroupDetails(groupId), {
    staleTime: Infinity,
  });
};

async function getAllGroups() {
  const response = await api.get("/system/administration/groups");
  return response.data;
}

async function createGroup(role: CreateGroupReqDto) {
  const response = await api.post("/system/administration/groups/add", role);
  return response.data;
}

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation(createGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries("groups");
    },
  });
};

async function updateGroup(groupId: number, group: UpdateGroupReqDto) {
  const response = await api.patch<GroupDetailsResDto>(
    `/system/administration/groups/${groupId}/update`,
    group
  );
  return response.data;
}

export const useUpdateGroup = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation((data: UpdateGroupReqDto) => updateGroup(groupId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("groups");
    },
  });
};

async function getGroups() {
  const response = await api.get<GroupListResDto>("/system/administration/groups");
  return response.data;
}

export const useGroups = () => {
  return useQuery("groups", getGroups);
};

async function deleteGroup(groupId: number) {
  const response = await api.delete(`/system/administration/groups/${groupId}/delete`);
  return response.data;
}

export const useDeleteGroup = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteGroup(groupId), {
    onSuccess: () => {
      queryClient.invalidateQueries("groups");
    },
  });
};

async function deleteRoleAssignment(roleAssignmentId: number) {
  const response = await api.delete(
    `/system/administration/group-access/${roleAssignmentId}/delete`
  );
  return response.data;
}

export const useDeleteRoleAssignment = (employeeId: number) => {
  const queryClient = useQueryClient();
  return useMutation((assignmentId: number) => deleteRoleAssignment(assignmentId), {
    onSuccess: () => {
      console.log("invalidateQueries");
      queryClient.invalidateQueries(["employees", employeeId, "teams"]);
    },
  });
};
