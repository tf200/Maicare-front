import React, { FunctionComponent, useMemo, useState } from "react";
import { useClientStatusHistory } from "@/utils/clients";
import { dateFormat } from "@/utils/timeFormatting";
import { STATUS_RECORD } from "@/consts";
import Button from "@/components/buttons/Button";
import ExpandIcon from "@/components/icons/ExpandIcon";
import ShrinkIcon from "@/components/icons/ShrinkIcon";

const SHOW_COUNT = 3;

const ClientStatusHistory: FunctionComponent<{
  clientId: number;
}> = ({ clientId }) => {
  const [expanded, setExpanded] = useState(false);
  const { data: statusHistory } = useClientStatusHistory(clientId);
  const show = useMemo(() => {
    if (expanded) {
      return statusHistory ?? [];
    }
    return statusHistory?.slice(0, SHOW_COUNT) ?? [];
  }, [statusHistory, expanded]);
  return (
    <div>
      {show.map((status) => (
        <div key={status.id} className="flex justify-between py-3 px-7 border-b border-stroke">
          <p className="text-sm">{STATUS_RECORD[status.status]}</p>
          <p className="text-sm">
            <strong>{dateFormat(status.start_date)}</strong>
          </p>
        </div>
      ))}
      {statusHistory?.length > SHOW_COUNT && (
        <Button
          buttonType={"Outline"}
          className="p-0 flex items-center h-10 top-0 w-full rounded-none border-none"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <span className="mr-4">{expanded ? "Zie minder" : "Zie meer"}</span>
        </Button>
      )}
    </div>
  );
};

export default ClientStatusHistory;
