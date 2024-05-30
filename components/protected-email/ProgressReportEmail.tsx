import { useGetReport } from "@/utils/reports/getReport";
import React from "react";
import Loader from "../common/Loader";
import { DAILY_REPORT_TYPES_OPTIONS, EMOTIONAL_STATE_OPTIONS } from "@/consts";
import { getLabelFormvalue } from "./_helper";

const ProgressReportEmail = ({ emailContent: { metadata, subject, expired_at } }) => {
  const { data: progressReportData, isLoading } = useGetReport(metadata.progress_report_id, 1);

  if (isLoading) return <Loader />;

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-3xl">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Voortgangsrapport</h2>
        <p className="text-lg mb-4 text-center">
          Dit rapport bevat de details van de voortgang van een medewerker, inclusief hun volledige
          naam, de datum van het rapport, het type rapport, hun emotionele staat, en de volledige
          rapporttekst. Dit document is bedoeld om de voortgang van de medewerker te volgen en
          eventuele belangrijke informatie vast te leggen en te delen.
        </p>
        <div className="space-y-6 text-gray-700">
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Onderwerp:</strong> {subject}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Voor-en achternaam:</strong> {progressReportData.full_name}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Rapportdatum:</strong>{" "}
              {new Date(progressReportData.date).toLocaleDateString()}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Type:</strong>{" "}
              {getLabelFormvalue(DAILY_REPORT_TYPES_OPTIONS, progressReportData.type)}
            </p>
          </div>
          <div className="text-center px-4 py-2 rounded-md border border-gray">
            <p className="text-xl">
              <strong>Emotionele staat:</strong>{" "}
              {getLabelFormvalue(EMOTIONAL_STATE_OPTIONS, progressReportData.emotional_state)}
            </p>
          </div>
          <div className="text-center px-4 py-2 ">
            <p className="text-xl ">
              <strong>Rapporteer tekst:</strong> {progressReportData.report_text}
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

export default ProgressReportEmail;
