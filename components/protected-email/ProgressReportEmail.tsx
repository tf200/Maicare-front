import { useGetReport } from "@/utils/reports/getReport";
import React from "react";
import Loader from "../common/Loader";
import { DAILY_REPORT_TYPES_OPTIONS, EMOTIONAL_STATE_OPTIONS } from "@/consts";
import { getLabelFormvalue } from "./_helper";

const ProgressReportEmail = ({ emailContent: { metadata, subject } }) => {
  const { data: progressReportData, isLoading } = useGetReport(metadata.progress_report_id, 1);

  if (isLoading) return <Loader />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Progress Report</h2>
        <div className="space-y-4">
          <p className="text-lg">
            <strong>Subject:</strong> {subject}
          </p>
          <p className="text-lg">
            <strong>Full Name:</strong> {progressReportData.full_name}
          </p>
          <p className="text-lg">
            <strong>Report Date:</strong> {new Date(progressReportData.date).toLocaleDateString()}
          </p>
          <p className="text-lg">
            <strong>Type:</strong>{" "}
            {getLabelFormvalue(DAILY_REPORT_TYPES_OPTIONS, progressReportData.type)}
          </p>
          <p className="text-lg">
            <strong>Emotional State:</strong>{" "}
            {getLabelFormvalue(EMOTIONAL_STATE_OPTIONS, progressReportData.emotional_state)}
          </p>
          <p className="text-lg">
            <strong>Report Text:</strong> {progressReportData.report_text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressReportEmail;
