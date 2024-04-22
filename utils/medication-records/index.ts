import api from "@/utils/api";
import {
  MedicationRecord,
  MedicationRecords,
  PatchMedicationRecordDto,
} from "@/types/medication-records";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { PaginationParams } from "@/types/pagination-params";

async function getMedicationRecords(
  medicationId: number,
  params: PaginationParams
) {
  const response = await api.get<MedicationRecords>(
    `/clients/medications/${medicationId}/records`,
    {
      params,
    }
  );
  return response.data;
}

export const useMedicationRecords = (medicationId: number) => {
  const pagination = usePaginationParams();
  const query = useQuery({
    queryKey: ["medication-records", medicationId, pagination.params],
    queryFn: () => getMedicationRecords(medicationId, pagination.params),
  });

  return {
    ...query,
    pagination,
  };
};

async function patchMedicationRecord(
  recordId: number,
  data: PatchMedicationRecordDto
) {
  const response = await api.patch<MedicationRecord>(
    `/clients/medications/records/${recordId}`,
    data
  );
  return response.data;
}

export const usePatchMedicationRecord = (recordId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: PatchMedicationRecordDto) => patchMedicationRecord(recordId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["medication-records", recordId]);
      },
    }
  );
};

export async function getMedicationRecord(recordId: number) {
  const response = await api.get<MedicationRecord>(
    `/clients/medications/records/${recordId}`
  );
  return response.data;
}

export const useMedicationRecordFetcher = () => {
  const queryClient = useQueryClient();

  return {
    fetch: async (recordId: number) => {
      return await queryClient.fetchQuery(
        ["medication-record-details", recordId],
        () => getMedicationRecord(recordId)
      );
    },
  };
};
