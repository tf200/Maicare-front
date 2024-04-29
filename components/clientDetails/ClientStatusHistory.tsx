import React, { FunctionComponent } from "react";
import { useClientStatusHistory } from "@/utils/clients";
import { dateFormat } from "@/utils/timeFormatting";
import { STATUS_RECORD } from "@/consts";

const ClientStatusHistory: FunctionComponent<{
  clientId: number;
}> = ({ clientId }) => {
  const { data: statusHistory } = useClientStatusHistory(clientId);
  return (
    <div>
      {statusHistory?.slice(0, 3).map((status) => (
        <div
          key={status.id}
          className="flex justify-between py-3 px-7 border-b border-stroke"
        >
          <p className="text-sm">{STATUS_RECORD[status.status]}</p>
          <p className="text-sm">
            <strong>{dateFormat(status.start_date)}</strong>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ClientStatusHistory;
