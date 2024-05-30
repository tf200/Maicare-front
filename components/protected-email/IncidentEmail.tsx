import React from "react";
import { useGetIncident } from "@/utils/new-incident/useGetSingleIncident";
import Loader from "../common/Loader";
import {
  CONSULTATION_NEEDED_OPTIONS,
  INJURY_OPTIONS,
  PSYCHOLOGICAL_DAMAGE_OPTIONS,
  REPORTER_INVOLVEMENT_OPTIONS,
  RISK_OF_RECURRENCE_OPTIONS,
  SEVERITY_OF_INCIDENT_OPTIONS,
} from "@/consts";
import { getLabelFormvalue } from "./_helper";

const IncidentEmail = ({ emailContent: { metadata, subject } }) => {
  const { data: incidentData, isLoading } = useGetIncident(metadata.incident_id, 1);

  if (isLoading) return <Loader />;

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
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
              <strong>Type incident:</strong> {incidentData.incident_type}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Uitleg:</strong> {incidentData.incident_explanation}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Stappen om incidenten te voorkomen:</strong>{" "}
              {incidentData.incident_prevent_steps}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Genomen maatregelen:</strong> {incidentData.incident_taken_measures}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Verklaring veroorzaken:</strong> {incidentData.cause_explanation}
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
              <strong>Overleg nodig:</strong>{" "}
              {getLabelFormvalue(CONSULTATION_NEEDED_OPTIONS, incidentData.needed_consultation)}
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
            <p className="text-xl">
              <strong>Psychische schade:</strong>{" "}
              {getLabelFormvalue(PSYCHOLOGICAL_DAMAGE_OPTIONS, incidentData.psychological_damage)} -{" "}
              {incidentData.psychological_damage_desc}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Betrokkenheid van journalisten:</strong>{" "}
              {getLabelFormvalue(REPORTER_INVOLVEMENT_OPTIONS, incidentData.reporter_involvement)} -{" "}
              {incidentData.physical_injury_desc}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Runtime incident:</strong> {incidentData.runtime_incident}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Andere oorzaak:</strong> {incidentData.other_cause}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Andere desc:</strong> {incidentData.other_desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentEmail;
