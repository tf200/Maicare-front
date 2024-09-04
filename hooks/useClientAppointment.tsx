import axiosInstance from "@/utils/api"
import { useQuery, useQueryClient } from "react-query"


export function useClientAppointment(clientId: number) {
  const queryClient = useQueryClient()

  const { data, isError, ...rest } = useQuery(
    ["client.appointment", { clientId }],
    () => fetchClientAppointment(clientId),
    {
      suspense: true,
      retry: false,
      enabled: !!clientId,
    },
  )
  
  const updateAppointment = async (appointment) => {
    await axiosInstance.patch(`/clients/${clientId}/appointment-card`, appointment)
    queryClient.invalidateQueries(["client.appointment", { clientId }])
  }

  return {
    appointment: data,
    updateAppointment,
    isError,
    ...rest,
  }
}




async function fetchClientAppointment(clientId: number) {
  const { data } = await axiosInstance.get(`/clients/${clientId}/appointment-card`)
  return data
}