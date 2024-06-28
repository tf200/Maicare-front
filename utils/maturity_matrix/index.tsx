import { useQuery } from "react-query";
import api from "../api";
import { CarePlanResDto } from "@/types/care-plan";

// type MaturityMatrixResDto = CarePlanResDto;

// async function getMaturityMatrix(id: number) {
//   const response = await api.get<MaturityMatrixResDto>(`client/maturity_matrix/${id}`);
//   return response.data;
// }

// export function useMaturityMatrix(id: number) {
//   return useQuery(["maturity-matrix", id], () => getMaturityMatrix(id));
// }
