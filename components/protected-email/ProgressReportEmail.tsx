import { useGetReport } from "@/utils/reports/getReport";
import React from "react";
import Loader from "../common/Loader";
import { DAILY_REPORT_TYPES_OPTIONS, EMOTIONAL_STATE_OPTIONS } from "@/consts";
import { getLabelFormvalue } from "./_helper";

const ProgressReportEmail = ({ emailContent: { metadata, subject, expired_at, content } }) => {
  const parsedContent: string = content
    .split("\n")
    .map((paragraph, i) => <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }}></p>);

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-3xl">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Samenvatting van het voortgangsrapport
        </h2>
        <p className="text-lg mb-4 text-center">
          Dit is een wekelijkse samenvatting van de voortgangsrapporten van de afgelopen week.
        </p>
        <div className="space-y-6 text-gray-700">
          <div className="text-left px-4 py-2 rounded-md border border-gray">{parsedContent}</div>

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
