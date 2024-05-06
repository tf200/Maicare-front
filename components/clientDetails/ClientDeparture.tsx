import React, { FunctionComponent } from "react";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import Panel from "@/components/Panel";

const ClientDeparture: FunctionComponent<{
  clientId: number;
}> = ({ clientId }) => {
  const { data, isLoading } = useClientDetails(clientId);

  if (isLoading || !data || data.status !== "Out Of Care") return null;
  if (!data.departure_reason && !data.departure_report) return null;
  return (
    <Panel title={"Vertrekgegevens"} containerClassName="px-7 py-4">
      <div className="flex flex-col gap-4">
        <div>
          <div className="font-bold">Vertrekreden</div>
          <div>{data.departure_reason}</div>
        </div>
        <div>
          <div className="font-bold">Vertrekrapport</div>
          <div>{data.departure_report}</div>
        </div>
      </div>
    </Panel>
  );
};

export default ClientDeparture;
