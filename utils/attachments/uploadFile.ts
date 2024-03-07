import { useMutation, useQueryClient } from "react-query";
import api from "@/utils/api";
import { FileUploadResponse } from "@/types/attachments/file-upload-res.dto";

export const endpoints = {
  global: "client/temporary-files/",
  appointment: "appointments/temporary-files/",
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
