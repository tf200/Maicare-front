import React from "react";
import { useGetIncident } from "@/utils/new-incident/useGetSingleIncident";
import Loader from "../common/Loader";
import {
  INJURY_OPTIONS,
  PSYCHOLOGICAL_DAMAGE_OPTIONS,
  RISK_OF_RECURRENCE_OPTIONS,
  SEVERITY_OF_INCIDENT_OPTIONS,
} from "@/consts";
import { getLabelFormvalue } from "./_helper";

const IncidentEmail = ({ emailContent: { metadata, subject } }) => {
  const { data: incidentData, isLoading } = useGetIncident(metadata.incident_id, 1);

  if (isLoading) return <Loader />;

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-3xl">
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Proces verbaal</h2>
        <div className="space-y-6 text-gray-700">
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Onderwerp:</strong> {subject}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Medewerker:</strong> {incidentData.employee_fullname} (
              {incidentData.employee_position})
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Incidentdatum:</strong>{" "}
              {new Date(incidentData.incident_date).toLocaleDateString()}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Ernst van het incident:</strong>{" "}
              {getLabelFormvalue(SEVERITY_OF_INCIDENT_OPTIONS, incidentData.severity_of_incident)}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Uitleg:</strong> {incidentData.incident_explanation}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Genomen maatregelen:</strong> {incidentData.incident_taken_measures}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Herhalingsrisico:</strong>{" "}
              {getLabelFormvalue(RISK_OF_RECURRENCE_OPTIONS, incidentData.recurrence_risk)}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Lichamelijk letsel:</strong>{" "}
              {getLabelFormvalue(INJURY_OPTIONS, incidentData.physical_injury)} -{" "}
              {incidentData.physical_injury_desc}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl ">
              <strong>Psychische schade:</strong>{" "}
              {getLabelFormvalue(PSYCHOLOGICAL_DAMAGE_OPTIONS, incidentData.psychological_damage)} -{" "}
              {incidentData.psychological_damage_desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentEmail;
