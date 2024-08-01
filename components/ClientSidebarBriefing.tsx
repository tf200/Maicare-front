import { useClientDetails } from "@/utils/clients/getClientDetails";
import ProfilePicture from "./ProfilePicture";
import { getAge } from "@/utils/getAge";
import dayjs from "dayjs";

interface ClientSidebarBriefingProps {
  clientId: number;
}

const ClientSidebarBriefing: React.FC<ClientSidebarBriefingProps> = ({ clientId }) => {
  const { data, isLoading, isError } = useClientDetails(parseInt(clientId.toString()));

  return (
    <div className="w-full flex flex-col font-bold items-center">
      <ProfilePicture profilePicture={data?.profile_picture} />
      <p className="pt-5 text-white">{data?.first_name + " " + data?.last_name}</p>
      <p>
        {data?.date_of_birth
          ? dayjs(data?.date_of_birth).format("DD MMM, YYYY") +
            ` (${getAge(data?.date_of_birth)} jaar oud)`
          : null}
      </p>
      <p>{"Dossiernummer : " + data?.filenumber}</p>
    </div>
  );
};

export default ClientSidebarBriefing;
