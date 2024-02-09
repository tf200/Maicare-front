"use client";

import React, { FunctionComponent } from "react";
import Loader from "@/components/common/Loader";
import Severity from "@/components/Severity";
import { useEpisodesList } from "@/utils/episodes/getEpisodeList";
import { EpisodesResDto } from "@/types/episodes/episodes-res-dto";
import { dateFormat } from "@/utils/timeFormatting";
import { convertIntensityToSeverity } from "@/utils/episodes/convertIntensityToSeverity";

type Props = {
  clientId: number;
  count?: number;
};

const EpisodesSummary: FunctionComponent<Props> = ({ clientId, count }) => {
  const { data, isLoading } = useEpisodesList(clientId, {
    page: 1,
    page_size: count || 5,
  });
  if (isLoading) return <Loader />;
  if (data.results?.length === 0)
    return <div>No recorded episode for client</div>;
  return (
    <ul className="flex flex-col gap-2">
      {data.results?.map((episode) => {
        return <EpisodesItem key={episode.id} episode={episode} />;
      })}
    </ul>
  );
};

export default EpisodesSummary;

type EmotionalStateItemProps = {
  episode: EpisodesResDto;
};

const EpisodesItem: FunctionComponent<EmotionalStateItemProps> = ({
  episode,
}) => {
  return (
    <li className="grid grid-cols-3 px-4 py-2 cursor-pointer hover:bg-gray-3 rounded-2xl">
      <div>{dateFormat(episode.date)}</div>
      <div className="flex items-center justify-center">
        <Severity severity={convertIntensityToSeverity(episode.intensity)} />
      </div>
      <div>{episode.state_description}</div>
    </li>
  );
};
