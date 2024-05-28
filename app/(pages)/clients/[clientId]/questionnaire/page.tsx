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
    label: "Samenwerkingsovereenkomst",
    urlKey: "collaboration-agreement",
    desc: "Dignissimos obcaecat Molestiae",
  },
  {
    label: "Risicobeoordeling",
    urlKey: "risk-assessments",
    desc: "Molestiae voluptas t Vitae ea qui et temp",
  },
];

const QuestionnaireMenu: FunctionComponent<Props> = ({ params: { clientId } }) => {
  return (
    <div className="p-8 flex gap-4 ">
      {StaticQuestionnaireMenu.map((item) => {
        return (
          <div
            key={item.urlKey}
            className="bg-white w-[350px] h-[120px] rounded-lg shadow-md hover:bg-primary hover:text-white "
          >
            <Link
              href={`./questionnaire/${item.urlKey}`}
              className="w-full h-full flex flex-col justify-center p-4"
            >
              <p className="font-bold mb-4 ">{item.label}</p>
              <span>{item.desc}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionnaireMenu;
