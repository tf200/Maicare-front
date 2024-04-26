import React, { FunctionComponent } from "react";
import { InvoiceType } from "@/types/InvoiceStatus";
import StatusBadge from "@/components/StatusBadge";
import { INVOICE_STATUS_RECORD, INVOICE_STATUS_VARIANT } from "@/consts";

export const InvoiceStatus: FunctionComponent<{ status: InvoiceType }> = ({
  status,
}) => {
  return (
    <StatusBadge
      text={INVOICE_STATUS_RECORD[status]}
      type={INVOICE_STATUS_VARIANT[status]}
    />
  );
};
