import api from "@/utils/api";
import {
  MedicationRecord,
  MedicationRecordParams,
  MedicationRecords,
  PatchMedicationRecordDto,
} from "@/types/medication-records";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { PaginationParams } from "@/types/pagination-params";
import { cleanQueryParams } from "@/utils/cleanQueryParams";

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

async function getClientMedicationRecords(
  clientId: number,
  params: PaginationParams & MedicationRecordParams
) {
  const response = await api.get<MedicationRecords>(
    `/clients/${clientId}/medications/records`,
    {
      params: cleanQueryParams(params),
    }
  );
  return response.data;
}

export const useClientMedicationRecords = (
  clientId: number,
  params?: MedicationRecordParams
) => {
  const pagination = usePaginationParams();
  const query = useQuery({
    queryKey: [
      "client-medication-records",
      clientId,
      { ...pagination.params, ...params },
    ],
    queryFn: () =>
      getClientMedicationRecords(clientId, { ...pagination.params, ...params }),
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
