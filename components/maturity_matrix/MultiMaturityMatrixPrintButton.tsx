import { getQuestionnairesTemplate } from "@/utils/questionnairs/templates/getQuestionnaireTemplate";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import IconButton from "../buttons/IconButton";
import { Download, LoaderCircle, Printer } from "lucide-react";
import { Tooltip } from "react-tooltip";

type MultiMaturityMatrixPrintButtonProps = {
  questIds: number[];
};




function MultiMaturityMatrixPrintButton({ questIds }: MultiMaturityMatrixPrintButtonProps) {
  const [isPrintTemplateLoading, setIsPrintTemplateLoading] = useState(false);
  const [pdfTemplate, setPdfTemplate] = useState<string | null>();


  const handleWarning = () => {
    toast.warning("Please select atleast one questionnaire", {
      position: "top-right",
      autoClose: 5000, // Duration in milliseconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handelPrintPdf = async() => {
    if(pdfTemplate) {
      // open in a new tab
      var link = document.createElement('a');
      link.href = pdfTemplate;
      link.target = '_blank';
      link.download = pdfTemplate;
      document.body.appendChild(link);
      link.click();
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

  const generateTemplateHandler = async () => {
    setIsPrintTemplateLoading(true);
    getQuestionnairesTemplate({ questionnairesId: questIds, templateType: "multi_maturity_matrix" })
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
  console.log(questIds);
  

  if(!questIds || questIds.length === 0) {
    return (
      <div data-tooltip-id="printerButton" >
        <IconButton
          className="bg-strokedark cursor-pointer opacity-40"
          onClick={() => { handleWarning(); }}
          >
          <Printer className="h-6 w-6" />
        </IconButton>
        <Tooltip id="printerButton" place="left" content="meervoudig afdrukken"/>
      </div>
    )
  }

  return ( 
    <>
      {!pdfTemplate && !isPrintTemplateLoading && (
          <div data-tooltip-id="printerButton">
            <IconButton
              className="bg-strokedark"
              onClick={() => { generateTemplateHandler(); }}
              >
              <Printer className="h-6 w-6" />
            </IconButton>
            <Tooltip id="printerButton" place="left" content="meervoudig afdrukken"/>
          </div>  
      )}
      {!pdfTemplate && isPrintTemplateLoading && (
        <IconButton className="bg-strokedark">
          <LoaderCircle className="h-6 w-6 animate-spin" />
        </IconButton>
      )}
      {pdfTemplate && (
          <IconButton className="bg-strokedark" onClick={() => { handelPrintPdf(); }} >
            <Download className="h-6 w-6"/>
          </IconButton>
      )}
    </>);
}

export default MultiMaturityMatrixPrintButton;
