"use client";

import React, { FunctionComponent } from "react";
import { useMyInfo } from "@/utils/user-info/getUserInfo";
import { LocationItem, LocationResDto } from "@/types/locations/location.dto";
import { useLocations } from "@/utils/locations";
import { useClientsList } from "@/utils/clients/getClientsList";
import { useEmployeesList } from "@/utils/employees/getEmployeesList";

function greeting() {
  const time = new Date().getHours();
  if (time < 12) {
    return "Goedemorgen";
  } else if (time < 18) {
    return "Goedemiddag";
  } else {
    return "Goedenavond";
  }
}

const DashboardOverview: React.FC = () => {
  const { data: profile } = useMyInfo();
  const { data: locations, isLoading: loadingLocation } = useLocations();
  if (!profile) return null;
  return (
    <div className="mb-6">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-title-lg font-bold text-black dark:text-white">
            {greeting() + ", " + profile?.first_name + " " + profile?.last_name}
          </h1>
        </div>
      </div>

      <h2 className="text-title-sm font-bold text-black dark:text-white mb-6">
        Overzicht van locaties
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {locations?.results.map((location: LocationResDto) => (
          <Location key={location.id} location={location} />
        ))}
        {loadingLocation ? <div>Laden...</div> : null}
      </div>
    </div>
  );
};

export default DashboardOverview;

const Location: FunctionComponent<{
  location: LocationItem;
}> = ({ location }) => {
  const { data: clients } = useClientsList({
    location: location.id,
    status__in: "In Care",
  });
  const { data: employees } = useEmployeesList({
    location: location.id,
  });
  return (
    <>
      {clients && employees && (
        <LocationWidget
          title={location.name}
          clients={clients.count}
          employees={employees.count}
          percentage={Math.min(100 * (clients.count / location.capacity), 100)}
        />
      )}
    </>
  );
};

const LocationWidget: FunctionComponent<{
  title?: string;
  clients?: number;
  employees?: number;
  percentage?: number;
}> = ({ title, clients, employees, percentage }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-7.5">
      <div className="flex items-end justify-between">
        <div>
          <h3 className="mb-4 text-title-lg font-bold text-black dark:text-white">
            {title}
          </h3>
          <p className="font-medium">
            <strong>Cliënten:</strong>
            {clients}
          </p>
          <p className="font-medium">
            <strong>Medewerkers:</strong> {employees}
          </p>
          {percentage >= 100 && (
            <span className="mt-2 flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-md bg-red p-1 text-xs font-medium text-white">
                <span>Locatie is vol</span>
              </span>
            </span>
          )}
        </div>

        <div>
          <svg className="h-17.5 w-17.5 -rotate-90 transform">
            <circle
              className="text-stroke dark:text-strokedark"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="30"
              cx="35"
              cy="35"
            />
            <circle
              className="text-primary"
              strokeWidth="10"
              strokeDasharray={30 * 2 * Math.PI}
              strokeDashoffset={
                30 * 2 * Math.PI - (percentage / 100) * 30 * 2 * Math.PI
              }
              stroke="currentColor"
              fill="transparent"
              r="30"
              cx="35"
              cy="35"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
