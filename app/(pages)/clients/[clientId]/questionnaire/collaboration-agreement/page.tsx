"use client";
import React, { FunctionComponent, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/table-core";
import LinkButton from "@/components/buttons/LinkButton";
import Loader from "@/components/common/Loader";
import PaginatedTable from "@/components/PaginatedTable";
import { fullDateFormat } from "@/utils/timeFormatting";
import Panel from "@/components/Panel";
import Link from "next/link";
import IconButton from "@/components/buttons/IconButton";
import PencilSquare from "@/components/icons/PencilSquare";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import { CollaborationAgreementsType } from "@/types/questionnaire/collaboration-agreement";
import { useGetCollborationList } from "@/utils/questionnairs/collabration-agreement/useGetAllCollabrotionAgreement";
import { useDeleteCollab } from "@/utils/questionnairs/collabration-agreement/useDeleteCollaboration";
import Icon from "@/components/Icon";
import { getQuestionnaireTemplate } from "@/utils/questionnairs/templates/getQuestionnaireTemplate";
import { Download, LoaderCircle, Printer } from "lucide-react";

type Props = {
  params: { clientId: string };
};

const CollaborationAgreement: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { mutate: deleteCollab } = useDeleteCollab(parseInt(clientId));
  const { data, pagination, isError, isLoading, isFetching } = useGetCollborationList(
    parseInt(clientId)
  );

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet je zeker dat je deze samenwerking wilt verwijderen?",
      title: "Samenwerking verwijderen",
    })
  );


  

  const columnDef = useMemo<ColumnDef<CollaborationAgreementsType>[]>(() => {
    return [
      {
        accessorKey: "client_full_name",
        header: "volledige naam van de klant",
      },
      {
        accessorKey: "client_number",
        header: "client nummer",
      },

      {
        accessorKey: "healthcare_institution_function",
        header: "Functie van zorginstellingen",
      },
      {
        accessorKey: "probation_full_name",
        header: "Volledige naam proeftijd",
      },
      {
        accessorKey: "probation_organization",
        header: "Reclassering organisatie ",
      },
      {
        accessorKey: "created",
        header: "Gemaakt",
        cell: (info) => fullDateFormat(info.getValue() as string),
      },
      {
        accessorKey: "action",
        header: "Acties",
        cell: (info) => {

          const [isPrintTemplateLoading, setIsPrintTemplateLoading] = useState(false);
          const [pdfTemplate, setPdfTemplate] = useState<string|null>();

          const handlePrintQuestionnaire = (questionnaireId: string) => {
            setIsPrintTemplateLoading(true);
            setTimeout(() => {
              setPdfTemplate("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");
              setIsPrintTemplateLoading(false);
            }, 4000);

            getQuestionnaireTemplate({questionnaireId, templateType: "collaboration_agreement" })
            .then(({ link }) => {
              window.open(link, "_blank");
            })
            .catch((error) => {
              console.error(error);
            });
          };
        
          return (
            <div className="flex gap-3">
              <Link
                href={`/clients/${clientId}/questionnaire/collaboration-agreement/${info.row.id}/edit`}
              >
                <IconButton>
                  <PencilSquare className="w-5 h-5" />
                </IconButton>
              </Link>
                { !pdfTemplate && !isPrintTemplateLoading &&
                  <IconButton className="bg-strokedark" onClick={()=>{ handlePrintQuestionnaire(info.row.id) }}>
                    <Printer className="w-5 h-5" />
                  </IconButton>
                }
                { !pdfTemplate && isPrintTemplateLoading &&
                  <IconButton className="bg-strokedark">
                    <LoaderCircle className="w-5 h-5 animate-spin" />
                  </IconButton>
                }
                { pdfTemplate && 
                  <IconButton className="bg-strokedark" onClick={()=>{ handlePrintQuestionnaire(info.row.id) }}>
                    <Download className="w-5 h-5" />
                  </IconButton>
                }
              <IconButton
                className="bg-red"
                onClick={() => {
                  return open({
                    onConfirm: () => {
                      deleteCollab(parseInt(info.row.id));
                    },
                  });
                }}
              >
                <DeleteIcon className="w-5 h-5" />
              </IconButton>
              
            </div>
          );
        },
      },
    ];
  }, []);

  return (
    <Panel
      title={"Samenwerkingsovereenkomst"}
      sideActions={
        <LinkButton
          text="nieuwe samenwerkingsovereenkomst toevoegen"
          href={"./collaboration-agreement/add"}
          className="ml-auto"
        />
      }
    >
      {isLoading && <Loader />}
      {data && (
        <PaginatedTable
          className="bg-white"
          data={data}
          columns={columnDef}
          page={pagination.page ?? 1}
          isFetching={isFetching}
          onPageChange={(page) => pagination.setPage(page)}
        />
      )}
      <div className="flex flex-wrap justify-between items-center p-4"></div>
      {isError && (
        <p role="alert" className="text-red">
          Sorry, er is een fout opgetreden waardoor we dit niet konden laden.
        </p>
      )}
    </Panel>
  );
};

export default CollaborationAgreement;
