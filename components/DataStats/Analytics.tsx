import React, { FunctionComponent, ReactNode } from "react";
import { useAnalytics } from "@/utils/analytics";
import IndividualIcons from "@/components/icons/IndividualIcons";
import HeartIcon from "@/components/icons/HeartIcon";
import InvoiceIcon from "@/components/icons/InvoiceIcon";
import { formatPrice } from "@/utils/priceFormatting";
import Loader from "@/components/common/Loader";

const Analytics: FunctionComponent = (props) => {
  const { data, isLoading } = useAnalytics();
  if (isLoading) return <Loader />;
  if (!data) return null;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 mb-6">
      <DataCard title={`Cliënten (${data?.users.total_users})`}>
        <div className="mt-4 flex gap-6">
          <div className="bg-meta-5/20 w-15 h-15 flex items-center justify-center text-meta-5 rounded-xl">
            <IndividualIcons width={30} height={30} />
          </div>
          <div>
            <div>
              <strong>In zorg:</strong> {data?.users.total_in_care_users}
            </div>
            <div>
              <strong>Uit zorg:</strong> {data?.users.total_out_of_care_users}
            </div>
            <div>
              <strong>Op wachtlijst:</strong>{" "}
              {data?.users.total_on_waiting_list_users}
            </div>
          </div>
        </div>
      </DataCard>
      <DataCard title={`Contracten (${data?.contracts.total_contracts})`}>
        <div className="mt-4 flex gap-6">
          <div className="bg-meta-3/20 text-meta-3 w-15 h-15 flex items-center justify-center rounded-xl">
            <IndividualIcons width={30} height={30} />
          </div>
          <div>
            <div>
              <strong>Accommodatie:</strong>{" "}
              {data?.contracts.total_accommodation_contracts}
            </div>
            <div>
              <strong>Ambulant:</strong>{" "}
              {data?.contracts.total_ambulante_contracts}
            </div>
            <div>
              <strong>Goedgekeurd:</strong>{" "}
              {data?.contracts.total_approved_contracts}
            </div>
            <div>
              <strong>Gestopt:</strong>{" "}
              {data?.contracts.total_stopped_contracts}
            </div>
            <div>
              <strong>Beëindigd:</strong>{" "}
              {data?.contracts.total_terminated_contracts}
            </div>
          </div>
        </div>
      </DataCard>

      <DataCard title={`Medicatie (${data?.medications.total_attachments})`}>
        <div className="mt-4 flex gap-6">
          <div className="bg-meta-7/20 text-meta-7 w-15 h-15 flex items-center justify-center rounded-xl">
            <HeartIcon width={30} height={30} />
          </div>
          <div>
            <div>
              <strong>Totaal medicijnen:</strong>{" "}
              {data?.medications.total_medications}
            </div>
            <div>
              <strong>Kritieke medicijnen:</strong>{" "}
              {data?.medications.total_critical_medications}
            </div>
            <div>
              <strong>Totaal medicijnrecords:</strong>{" "}
              {data?.medications.total_medication_records}
            </div>
            <div>
              <strong>Genomen medicijnrecords:</strong>{" "}
              {data?.medications.total_taken_medication_records}
            </div>
            <div>
              <strong>Niet genomen medicijnrecords:</strong>{" "}
              {data?.medications.total_not_taken_medication_records}
            </div>
            <div>
              <strong>Wachtende medicijnrecords:</strong>{" "}
              {data?.medications.total_waiting_medication_records}
            </div>
          </div>
        </div>
      </DataCard>

      <DataCard title={`Facturen (${data?.invoices.total_invoices})`}>
        <div className="mt-4 flex gap-6">
          <div className="bg-meta-6/20 text-meta-6 w-15 h-15 flex items-center justify-center rounded-xl">
            <InvoiceIcon width={30} height={30} />
          </div>
          <div>
            <div>
              <strong>Betaalde facturen:</strong>{" "}
              {data?.invoices.total_paid_invoices}
            </div>
            <div>
              <strong>Deels betaalde facturen:</strong>{" "}
              {data?.invoices.total_partially_paid_invoices}
            </div>
            <div>
              <strong>Openstaande facturen:</strong>{" "}
              {data?.invoices.total_outstanding_invoices}
            </div>
            <div>
              <strong>Teveel betaalde facturen:</strong>{" "}
              {data?.invoices.total_overpaid_invoices}
            </div>
          </div>
        </div>
      </DataCard>

      <DataCard title={"Financiën"}>
        <div className="mt-4 flex gap-6">
          <div className="bg-meta-8/20 text-meta-8 w-15 h-15 flex items-center justify-center rounded-xl">
            <div className="text-title-lg font-bold">€</div>
          </div>
          <div>
            <div>
              <strong>Totaal betaald:</strong>{" "}
              {formatPrice(+data?.finance.total_paid_amount)}
            </div>
            <div>
              <strong>Totaal uitgaven:</strong>{" "}
              {formatPrice(+data?.finance.total_expenses)}
            </div>
          </div>
        </div>
      </DataCard>
    </div>
  );
};

export default Analytics;

type Props = {
  title: ReactNode;
  children: ReactNode;
};

const DataCard: FunctionComponent<Props> = ({ title, children }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h2 className="text-title-md font-bold text-black dark:text-white">
        {title}
      </h2>
      {children}
    </div>
  );
};
