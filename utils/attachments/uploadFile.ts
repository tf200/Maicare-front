import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "@/utils/api";
import { FileUploadResponse } from "@/types/attachments/file-upload-res.dto";
import { AttachmentItem } from "@/types/appointments/appointment-res-dto";

export const endpoints = {
  global: "client/temporary-files/",
  appointment: "appointments/temporary-files/",
  global_v2: "system/attachments/upload",
};

export type UploadEndpointType = keyof typeof endpoints;

async function uploadFile(file: File, endpoint: UploadEndpointType = "global") {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post<FileUploadResponse>(
    endpoints[endpoint],
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export const useUploadFile = (endpoint: UploadEndpointType = "global") => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadFile(file, endpoint),
    onSuccess: (data) => {
      queryClient.setQueryData(["attachments", data.id], data);
    },
  });
};

async function patchFileData(
  fileId: string,
  data: Partial<FileUploadResponse>
) {
  const response = await api.patch<FileUploadResponse>(
    `/system/attachments/${fileId}/update`,
    data
  );
  return response.data;
}

export const usePatchFileData = (fileId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: Partial<FileUploadResponse>) => patchFileData(fileId, data),
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(["attachments", data.id], data);
      },
    }
  );
};

async function getFileData(fileId: string) {
  const response = await api.get<FileUploadResponse>(
    `/system/attachments/${fileId}`
  );
  return response.data;
}

export const useFileData = (fileId?: string) => {
  return useQuery(["attachments", fileId], () => getFileData(fileId), {
    enabled: !!fileId,
  });
};
