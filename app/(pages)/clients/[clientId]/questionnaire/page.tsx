"use client";
import React, { FunctionComponent, useMemo } from "react";
import LinkButton from "@/components/buttons/LinkButton";
import Panel from "@/components/Panel";
import Link from "next/link";

type Props = {
  params: { clientId: string };
};

type QuestionnaireMenu = {
  label: string;
  urlKey: string;
  desc?: string;
};

const StaticQuestionnaireMenu: QuestionnaireMenu[] = [
  {
    label: "Samenwerkingsafspraken",
    urlKey: "collaboration-agreement",
    desc: "Nieuwe samenwerkingsovereenkomst maken voor deze klant",
  },
  {
    label: "Risicobeoordelingen",
    urlKey: "risk-assessements",
    desc: "Nieuwe risicobeoordelingen voor deze klant",
  },
  {
    label: "Toestemmingsverklaring",
    urlKey: "consent-declaration",
    desc: "Nieuwe toestemmingsverklaring voor deze klant",
  },
  {
    label: "Verklaring over het delen van gegevens",
    urlKey: "data-sharing",
    desc: "Nieuwe verklaring voor het delen van gegevens voor deze klant",
  },
  {
    label: "Zelfduurzaamheidsmatrix",
    urlKey: "maturity-matrix",
    desc: "Nieuwe Zelfduurzaamheidsmatrix voor deze klant",
  },
  {
    label: "Aanmeldformulier ",
    urlKey: "registration-form",
    desc: "Aanmeldformulier voor 24/7 Jeugdzorginstelling",
  },
  {
    label: "Intakeformulier ",
    urlKey: "intake-form",
    desc: "Intakeformulier voor 24/7 Jeugdzorginstelling",
  },
];

const QuestionnaireMenu: FunctionComponent<Props> = ({ params: { clientId } }) => {
  return (
    <div className="p-8 flex gap-4 flex-wrap">
      {StaticQuestionnaireMenu.map((item) => {
        return (
          <div
            key={item.urlKey}
            className="bg-white w-[350px] h-[120px] rounded-lg shadow-md hover:bg-primary hover:text-white  dark:bg-slate-700 dark:hover:bg-primary dark:hover:text-white"
          >
            <Link
              href={`./questionnaire/${item.urlKey}`}
              className="w-full h-full flex flex-col justify-center p-4"
            >
              <p className="font-bold mb-2 ">{item.label}</p>
              <span>{item.desc}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionnaireMenu;
