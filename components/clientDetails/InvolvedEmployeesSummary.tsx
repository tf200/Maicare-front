import React, { FunctionComponent } from "react";
import { useInvolvedEmployeesList } from "@/utils/involved-employees/getInvolvedEmployeesList";
import Panel from "@/components/Panel";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";
import LinkButton from "@/components/buttons/LinkButton";
import { dateFormat } from "@/utils/timeFormatting";
import { EMPLOYEE_ASSIGNMENT_RECORD } from "@/consts";

const InvolvedEmployeesContent: FunctionComponent<{
  clientId: number;
}> = ({ clientId }) => {
  const { isError, isLoading, data } = useInvolvedEmployeesList(clientId, {
    page: 1,
    page_size: 3,
  });

  if (isLoading) return <Loader />;
  if (isError)
    return <div>Er is een fout opgetreden bij het ophalen van de gegevens</div>;
  if (!data) return <div>Geen gegevens opgehaald</div>;
  if (data.results?.length === 0)
    return <div>Geen betrokken medewerkers gevonden</div>;

  return (
    <ul className="flex flex-col gap-2">
      {data.results?.map((employee) => {
        return (
          <li
            key={employee.id}
            className="grid grid-cols-2 hover:bg-gray-3 dark:hover:bg-slate-700 p-4 cursor-pointer rounded-xl"
          >
            <DetailCell
              ignoreIfEmpty={true}
              label={employee.employee_name}
              value={EMPLOYEE_ASSIGNMENT_RECORD[employee.role]}
            />
            <DetailCell
              label={"Startdatum"}
              value={dateFormat(employee.start_date)}
            />
          </li>
        );
      })}
    </ul>
  );
};

const InvolvedEmployeesSummary: FunctionComponent<{ clientId: number }> = ({
  clientId,
}) => {
  return (
    <Panel
      title={"Betrokken medewerkers"}
      containerClassName="px-7 py-4"
      sideActions={
        <div className="flex gap-4">
          <LinkButton
            href={`/clients/${clientId}/client-network/involved-employees`}
            text={"Volledige medewerkerslijst"}
          />
        </div>
      }
    >
      <InvolvedEmployeesContent clientId={clientId} />
    </Panel>
  );
};

export default InvolvedEmployeesSummary;
