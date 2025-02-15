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
import { SecureFragment, useMyPermissions } from "@/components/SecureWrapper";
import * as consts from "@/consts/permissions";
import UpdateClientStatus from "@/components/clientDetails/UpdateClientStatus";
import ClientStatusHistory from "@/components/clientDetails/ClientStatusHistory";
import InvolvedEmployeesSummary from "@/components/clientDetails/InvolvedEmployeesSummary";
import ClientPositionPicker from "@/components/clientDetails/ClientPositionPicker";
import ClientDeparture from "@/components/clientDetails/ClientDeparture";
import { useDocumentList } from "@/utils/document/getDocumentList";
import { DOCUMENT_LABELS, DOCUMENT_LABEL_OPTIONS } from "@/consts";
import QuestionnaireDownloadButton from "../../../../components/QuestionnaireDownloadButton";

type Props = {
  params: { clientId: string };
};

const ClientDetailsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const router = useRouter();
  const { hasPerm } = useMyPermissions();

  const { mutate: deleteClient, isLoading: isDeleting, isSuccess: isDeleted } = useDeleteClient();

  const {
    isLoading: isListLoading,
    data,
  } = useDocumentList(clientId, {
    page_size: 1000,
    page: 1,
  });

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

  const TOTAL_REQUIRED_DOCUMENTS = Object.keys(DOCUMENT_LABELS).length - 1;
  let ALREADY_UPLOADED_DOCUMENTS = [];
  let NOT_UPLOADED_DOCUMENTS = [];

  if (!isListLoading && data !== undefined && data?.results !== undefined) {
    ALREADY_UPLOADED_DOCUMENTS = data?.results.map((doc) => doc.label);
    let JUST_DOCUMENT_LABEL_OPTIONS = DOCUMENT_LABEL_OPTIONS.filter(
      (option) => option.value !== ""
    ); // remove the select option
    NOT_UPLOADED_DOCUMENTS = JUST_DOCUMENT_LABEL_OPTIONS.filter(
      (option) => !ALREADY_UPLOADED_DOCUMENTS.includes(option.value) && option.value != "other"
    );
  }

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
                <SecureFragment permission={consts.CLIENT_EDIT}>
                  <Link href={`/clients/${clientId}/edit`}>
                    <IconButton>
                      <PencilSquare className="w-5 h-5" />
                    </IconButton>
                  </Link>
                </SecureFragment>
                <QuestionnaireDownloadButton type="client_details" questId={+clientId} />
                <SecureFragment permission={consts.CLIENT_DELETE}>
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
                </SecureFragment>
              </div>
            }
          >
            <ClientInformation clientId={parseInt(clientId)} />
          </Panel>
          <Panel title={"Locatiegegevens"} containerClassName="px-7 py-4">
            <LocationDetails clientId={parseInt(clientId)} />
          </Panel>
          <SecureFragment permission={consts.CONTACT_VIEW}>
            <Panel
              title={"Noodcontacten"}
              containerClassName="px-7 py-4"
              sideActions={
                hasPerm(consts.CONTACT_EDIT) && (
                  <LinkButton
                    text={"Volledige Contactenlijst"}
                    href={`/clients/${clientId}/emergency`}
                  />
                )
              }
            >
              <EmergencyContactsSummary clientId={parseInt(clientId)} />
            </Panel>
          </SecureFragment>
          <InvolvedEmployeesSummary clientId={parseInt(clientId)} />
          <ContactSummary clientId={parseInt(clientId)} />
          <SecureFragment permission={consts.CONTRACT_VIEW}>
            <Panel
              title={"Contracten"}
              containerClassName="px-7 py-4"
              sideActions={
                hasPerm(consts.CONTRACT_EDIT) && (
                  <LinkButton text={"Bekijk Cliëntcontracten"} href={`${clientId}/contracts`} />
                )
              }
            >
              <ContractsSummary clientId={parseInt(clientId)} />
            </Panel>
          </SecureFragment>
          <Panel
            title={`Documenten (${data?.results.length}/${TOTAL_REQUIRED_DOCUMENTS})`}
            containerClassName="px-7 py-4"
            sideActions={
              <LinkButton
                text={
                  NOT_UPLOADED_DOCUMENTS.length
                    ? `Moet ${NOT_UPLOADED_DOCUMENTS.length} extra documenten toevoegen`
                    : "Volledige Documenten"
                }
                href={`${clientId}/document`}
                className={NOT_UPLOADED_DOCUMENTS.length && "bg-red-600"}
              />
            }
          >
            {NOT_UPLOADED_DOCUMENTS.length > 0 && (
              <div className="p-5 bg-c_red text-white font-bold rounded-lg mb-5">
                Zorg ervoor dat u de rest van de documenttypen uploadt:
                <ul>
                  {NOT_UPLOADED_DOCUMENTS.map((doc, index) => (
                    <li key={index}>- {doc.label}</li>
                  ))}
                </ul>
              </div>
            )}
            <DocumentsSummary clientId={parseInt(clientId)} />
          </Panel>
        </div>
        <div className="flex flex-col gap-9">
          <Panel title={"Cliëntstatus"} containerClassName="py-4">
            <SecureFragment permission={consts.EDIT_CLIENT_STATUS}>
              <div className="px-4 mt-7">
                <UpdateClientStatus clientId={parseInt(clientId)} />
              </div>
            </SecureFragment>
            <ClientStatusHistory clientId={parseInt(clientId)} />
          </Panel>
          <ClientDeparture clientId={parseInt(clientId)} />
          <SecureFragment permission={consts.CLIENT_IDENTITY_VIEW}>
            <Panel title={"Identiteitsgegevens"} containerClassName="px-7 py-4">
              <IdentityDetails clientId={parseInt(clientId)} />
            </Panel>
          </SecureFragment>
          <Panel title={"Adresgegevens"} containerClassName="px-7 py-4">
            <AddressDetails clientId={parseInt(clientId)} />
          </Panel>
          <ClientPositionPicker clientId={parseInt(clientId)} />
          <Panel
            title={"Medisch Dossier"}
            containerClassName="px-7 py-4"
            sideActions={
              <LinkButton text={"Volledig Medisch Dossier"} href={`${clientId}/medical-record`} />
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
        </div>
      </div>
    </>
  );
};

export default ClientDetailsPage;
