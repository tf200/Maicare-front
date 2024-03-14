"use client";
import React, { FunctionComponent, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import ClientInformation from "@/components/clientDetails/ClientInformation";
import IdentityDetails from "@/components/clientDetails/IdentityDetails";
import AddressDetails from "@/components/clientDetails/AddressDetails";
import LocationDetails from "@/components/clientDetails/LocationDetails";
import MedicalRecordSummary from "@/components/clientDetails/MedicalRecordSummary";
import EmergencyContactsSummary from "@/components/clientDetails/EmergyencyContactsSummary";
import DocumentsSummary from "@/components/clientDetails/DocumentsSummary";
import LinkButton from "@/components/buttons/LinkButton";
import Link from "next/link";
import ReportsSummary from "@/components/clientDetails/ReportsSummary";
import ContractsSummary from "@/components/clientDetails/ContractsSummary";
import IconButton from "@/components/buttons/IconButton";
import PencilSquare from "@/components/icons/PencilSquare";
import TrashIcon from "@/components/icons/TrashIcon";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import { useDeleteClient } from "@/utils/clients/deleteClient";
import CheckIcon from "@/components/icons/CheckIcon";
import { useRouter } from "next/navigation";
import ContactSummary from "@/components/clientDetails/ContactSummary";

type Props = {
  params: { clientId: string };
};

const ClientDetailsPage: FunctionComponent<Props> = ({
  params: { clientId },
}) => {
  const router = useRouter();

  const {
    mutate: deleteClient,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteClient();

  useEffect(() => {
    if (isDeleted) {
      setTimeout(() => {
        router.push(`/clients`);
      }, 700);
    }
  }, [isDeleted]);

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet u zeker dat u deze cliënt wilt verwijderen?",
      title: "Cliënt Verwijderen",
    })
  );

  return (
    <>
      {/*"Client details"*/}
      <Breadcrumb pageName="Cliëntgegevens" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <Panel
            title={"Cliëntinformatie"}
            containerClassName="px-7 py-4"
            sideActions={
              <div className="flex gap-4">
                <Link href={`/clients/${clientId}/edit`}>
                  <IconButton>
                    <PencilSquare className="w-5 h-5" />
                  </IconButton>
                </Link>

                <IconButton
                  buttonType="Danger"
                  onClick={() => {
                    open({
                      onConfirm: () => {
                        deleteClient(parseInt(clientId));
                      },
                    });
                  }}
                  disabled={isDeleted}
                  isLoading={isDeleting}
                >
                  {isDeleted ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <TrashIcon className="w-5 h-5" />
                  )}
                </IconButton>
              </div>
            }
          >
            <ClientInformation clientId={parseInt(clientId)} />
          </Panel>
          <Panel title={"Locatiegegevens"} containerClassName="px-7 py-4">
            <LocationDetails clientId={parseInt(clientId)} />
          </Panel>
          <Panel
            title={"Noodcontacten"}
            containerClassName="px-7 py-4"
            sideActions={
              <LinkButton
                text={"Volledige Contactenlijst"}
                href={`/clients/${clientId}/emergency`}
              />
            }
          >
            <EmergencyContactsSummary clientId={parseInt(clientId)} />
          </Panel>
          <ContactSummary clientId={parseInt(clientId)} />
          <Panel
            title={"Contracten"}
            containerClassName="px-7 py-4"
            sideActions={
              <LinkButton
                text={"Bekijk Cliëntcontracten"}
                href={`${clientId}/contracts`}
              />
            }
          >
            <ContractsSummary clientId={parseInt(clientId)} />
          </Panel>
        </div>
        <div className="flex flex-col gap-9">
          <Panel title={"Identiteitsgegevens"} containerClassName="px-7 py-4">
            <IdentityDetails clientId={parseInt(clientId)} />
          </Panel>
          <Panel title={"Adresgegevens"} containerClassName="px-7 py-4">
            <AddressDetails clientId={parseInt(clientId)} />
          </Panel>
          <Panel
            title={"Medisch Dossier"}
            containerClassName="px-7 py-4"
            sideActions={
              <LinkButton
                text={"Volledig Medisch Dossier"}
                href={`${clientId}/medical-record`}
              />
            }
          >
            <MedicalRecordSummary clientId={parseInt(clientId)} />
          </Panel>
          <Panel
            title={"Rapporten"}
            containerClassName="px-7 py-4"
            sideActions={
              <LinkButton
                text={"Volledige Rapporten"}
                href={`${clientId}/reports-record/reports`}
              />
            }
          >
            <ReportsSummary clientId={parseInt(clientId)} />
          </Panel>
          <Panel
            title={"Documenten"}
            containerClassName="px-7 py-4"
            sideActions={
              <LinkButton
                text={"Volledige Documenten"}
                href={`${clientId}/document`}
              />
            }
          >
            <DocumentsSummary clientId={parseInt(clientId)} />
          </Panel>
        </div>
      </div>
    </>
  );
};

export default ClientDetailsPage;
