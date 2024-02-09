import { NewEpisodeReqDto } from "@/types/episodes/new-episode-req-dto";

export type EpisodesResDto = {
  id: number;
  created: string;
} & NewEpisodeReqDto;
