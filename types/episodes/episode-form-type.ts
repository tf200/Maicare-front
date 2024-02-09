import { NewEpisodeReqDto } from "@/types/episodes/new-episode-req-dto";

export type EpisodeFormType = Omit<NewEpisodeReqDto, "client">;
