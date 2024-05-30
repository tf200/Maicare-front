import React from "react";
import { useGetIncident } from "@/utils/new-incident/useGetSingleIncident";
import Loader from "../common/Loader";
import {
  CLIENT_OPTIONS,
  CONSULTATION_NEEDED_OPTIONS,
  INFORM_WHO_OPTIONS,
  INJURY_OPTIONS,
  MESE_WORKER_OPTIONS,
  ORGANIZATIONAL_OPTIONS,
  PSYCHOLOGICAL_DAMAGE_OPTIONS,
  REPORTER_INVOLVEMENT_OPTIONS,
  RISK_OF_RECURRENCE_OPTIONS,
  SEVERITY_OF_INCIDENT_OPTIONS,
  SUCCESSION_OPTIONS,
  TECHNICAL_OPTIONS,
} from "@/consts";
import { getLabelFormvalue } from "./_helper";

const IncidentEmail = ({ emailContent: { metadata, subject, expired_at } }) => {
  const { data: incidentData, isLoading } = useGetIncident(metadata.incident_id, 1);

  if (isLoading) return <Loader />;

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-3xl">
        <h2 className="text-4xl font-bold  text-center text-gray-800">Proces verbaal</h2>
        <div className="text-gray-700 mb-10 mt-6">
          <p className="text-lg mb-4 text-center">
            Dit rapport bevat de details van een incident dat plaatsvond en beschrijft de betrokken
            medewerker, de datum van het incident, de ernst van het incident, de genomen
            maatregelen, en meer. Dit document is bedoeld voor intern gebruik en om ervoor te zorgen
            dat alle relevante informatie wordt vastgelegd en besproken.
          </p>
        </div>
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
              <strong>Klant opties:</strong>{" "}
              {incidentData.client_options.map((v) => CLIENT_OPTIONS[v]).join(" - ")}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Informeer wie:</strong>{" "}
              {incidentData.inform_who.map((v) => INFORM_WHO_OPTIONS[v]).join(" - ")}
            </p>
          </div>

          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Meze werker:</strong>{" "}
              {incidentData.mese_worker.map((v) => MESE_WORKER_OPTIONS[v]).join(" - ")}
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
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Organisatorisch</strong>{" "}
              {incidentData.organizational.map((v) => ORGANIZATIONAL_OPTIONS[v]).join(" - ")}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Opvolging:</strong>{" "}
              {incidentData.succession.map((v) => SUCCESSION_OPTIONS[v]).join(" - ")}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Technisch:</strong>{" "}
              {incidentData.technical.map((v) => TECHNICAL_OPTIONS[v]).join(" - ")}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Deze e-mail verloopt op {new Date(expired_at).toLocaleDateString()} </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentEmail;
