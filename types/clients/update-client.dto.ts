import { ClientDetailsResDto } from "@/types/clients/client-details-res-dto";

export type UpdateClientDto = Partial<
  Omit<ClientDetailsResDto, "id" | "profile_picture">
>;
