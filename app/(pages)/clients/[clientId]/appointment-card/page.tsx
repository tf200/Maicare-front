"use client";

import React, { useCallback } from "react";
import Panel from "@/components/Panel";
import { useClientAppointment } from "@/hooks/useClientAppointment";
import LinkButton from "@/components/buttons/LinkButton";
import QuestionnaireDownloadButton from "@/components/QuestionnaireDownloadButton";
import Link from "next/link";
import IconButton from "@/components/buttons/IconButton";
import PencilSquare from "@/components/icons/PencilSquare";

export default function ClientAppointmentCardPage({
  params: { clientId },
}: {
  params: { clientId: number };
}) {
  const { appointment } = useClientAppointment(clientId);

  const renderSection = useCallback(
    (title: string, items: { content: string }[]) => (
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <tbody>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="p-2">{item.content}</td>
                  </tr>
                ))
              ) : (
                <tr className="border-b border-gray-300 h-9">
                  <td className="p-2 text-gray-500"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    ),
    []
  );

  return (
    <Panel
      title={`Afsprakenkaart Chrystal voor cliënt ${clientId}`}
      header={
        <div className="flex w-full justify-end gap-2">
          <QuestionnaireDownloadButton type="appointment_card"  questId={+clientId}/>
          <Link href={`/clients/${clientId}/appointment-card/edit`}>
            <IconButton>
              <PencilSquare className="w-5 h-5" />
            </IconButton>
          </Link>
        </div>
        
      }
    >
      <div className="p-6  gap-6">
        {renderSection("Algemeen", appointment.general)}
        {renderSection("Belangrijke contacten", appointment.important_contacts)}
        {renderSection("Huishouden", appointment.household)}
        {renderSection("Organisatie afspraken", appointment.organization_agreements)}
        {renderSection("Reclassering afspraken", appointment.probation_service_agreements)}
        {renderSection(
          "Afspraken met betrekking tot behandeling",
          appointment.appointments_regarding_treatment
        )}
        {renderSection("Schoolfase", appointment.school_stage)}
        {renderSection("Reizen", appointment.travel)}
        {renderSection("Verlof", appointment.leave)}
      </div>
    </Panel>
  );
}
