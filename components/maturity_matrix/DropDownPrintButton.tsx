import React, { useEffect, useState } from 'react'
import DropDownButton from '../buttons/DropDownButton';
import IconButton from '../buttons/IconButton';
import { getQuestionnairesTemplate, getQuestionnaireTemplate } from '@/utils/questionnairs/templates/getQuestionnaireTemplate';
import { Download, LoaderCircle, Printer } from 'lucide-react';
import { toast } from 'react-toastify';

type DropDownPrintButtonProps = {
  questId: number;
};

function DropDownPrintButton({ questId }: DropDownPrintButtonProps) {

  const [isPrintTemplateLoading, setIsPrintTemplateLoading] = useState(false);
  const [pdfTemplate, setPdfTemplate] = useState<string | null>();


  
  const handelPrintPdf = () => {
    if(pdfTemplate) {
      // open in a new tab
      var link = document.createElement('a');
      link.href = pdfTemplate;
      link.target = '_blank';
      link.download = pdfTemplate;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      document.body.removeChild(link);
      setTimeout(() => {
        setPdfTemplate(null);
      }, 1000);
    }else{
      toast.error("Pdf template not found", {
        position: "top-right",
        autoClose: 5000, // Duration in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleGenerateSmartFormulaTemplate = () => {
    setIsPrintTemplateLoading(true);
    getQuestionnaireTemplate({ questionnaireId: questId, templateType: "maturity_matrix" })
    .then(({ link }) => {
      setPdfTemplate(link);
    })
    .catch((error) => {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000, // Duration in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }).finally(() => {
      setIsPrintTemplateLoading(false);
    });
  };

  const handleGenerateGoalsAndObjectivesTemplate = () => {
    setIsPrintTemplateLoading(true);
    getQuestionnaireTemplate({ questionnaireId: questId, templateType: "goals_and_objectives_content" })
    .then(({ link }) => {
      setPdfTemplate(link);
    })
    .catch((error) => {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000, // Duration in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }).finally(() => {
      setIsPrintTemplateLoading(false);
    });
  };



  return (
    <>
      {!pdfTemplate && !isPrintTemplateLoading && (
        <DropDownButton items={[
          {
            title: "matrix voor zelfbehoud",
            onClickHandler: () => {
              handleGenerateSmartFormulaTemplate();
            },
          },
          {
            title: "Doelen en doelstellingen (slimme formule)",
            onClickHandler: () => {
              handleGenerateGoalsAndObjectivesTemplate();
            },
          }
        ]} >
          <IconButton
            className="bg-strokedark">
            <Printer className="h-5 w-5" />
          </IconButton>
        </DropDownButton>
      )}
      {!pdfTemplate && isPrintTemplateLoading && (
        <IconButton className="bg-strokedark">
          <LoaderCircle className="h-5 w-5 animate-spin" />
        </IconButton>
      )}
      {pdfTemplate && (
          <IconButton className="bg-strokedark" onClick={() => { handelPrintPdf(); }} >
            <Download className="h-5 w-5"/>
          </IconButton>
      )}
    </>
  )
}

export default DropDownPrintButton
