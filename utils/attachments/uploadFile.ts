import { useMutation, useQueryClient } from "react-query";
import api from "@/utils/api";
import { FileUploadResponse } from "@/types/attachments/file-upload-res.dto";

async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post<FileUploadResponse>(
    "appointments/temporary-files/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export const useUploadFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      queryClient.setQueryData(["attachments", data.id], data);
    },
  });
};
