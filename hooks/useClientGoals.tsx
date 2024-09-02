import axiosInstance from "@/utils/api"
import { useQuery } from "react-query"


export function useClientGoals(clientId: number) {


  const { data, isError, ...rest } = useQuery(
    ["client.goals", { clientId }],
    () => fetchClientGoals(clientId),
    {
      suspense: true,
      retry: false,
    },
  )
  console.log("goals", data)

  return {
    goals: data,
    isError,
    ...rest,
  }
}




async function fetchClientGoals(clientId: number) {
  const { data } = await axiosInstance.get(`/clients/${clientId}/all-goals`)
  return data
}