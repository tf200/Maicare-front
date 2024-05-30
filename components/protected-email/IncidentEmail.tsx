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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Incident Report</h2>
        <div className="space-y-4">
          <p className="text-lg">
            <strong>Subject:</strong> {subject}
          </p>
          <p className="text-lg">
            <strong>Employee:</strong> {incidentData.employee_fullname} (
            {incidentData.employee_position})
          </p>
          <p className="text-lg">
            <strong>Incident Date:</strong>{" "}
            {new Date(incidentData.incident_date).toLocaleDateString()}
          </p>
          <p className="text-lg">
            <strong>Severity of Incident:</strong>{" "}
            {getLabelFormvalue(SEVERITY_OF_INCIDENT_OPTIONS, incidentData.severity_of_incident)}
          </p>

          <p className="text-lg">
            <strong>Explanation:</strong> {incidentData.incident_explanation}
          </p>
          <p className="text-lg">
            <strong>Measures Taken:</strong> {incidentData.incident_taken_measures}
          </p>
          <p className="text-lg">
            <strong>Recurrence Risk:</strong>{" "}
            {getLabelFormvalue(RISK_OF_RECURRENCE_OPTIONS, incidentData.recurrence_risk)}
          </p>
          <p className="text-lg">
            <strong>Physical Injury:</strong>{" "}
            {getLabelFormvalue(INJURY_OPTIONS, incidentData.physical_injury)}-{" "}
            {incidentData.physical_injury_desc}
          </p>
          <p className="text-lg">
            <strong>Psychological Damage:</strong>{" "}
            {getLabelFormvalue(PSYCHOLOGICAL_DAMAGE_OPTIONS, incidentData.psychological_damage)} -{" "}
            {incidentData.psychological_damage_desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IncidentEmail;
