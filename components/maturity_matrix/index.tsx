"useClient";

import { cn } from "@/utils/cn";
import {
  selectedAssessment,
  useClientLevels,
  useClientSelectedAssessments,
  useDomains,
} from "@/utils/domains";
import { DomainLevel, DomainLevels, MDomain } from "@/types/domains";
import { useCallback, useEffect, useState } from "react";
import { SetDomainLevelReqDto } from "@/types/goals";
import Icon from "../Icon";
import { useRouter } from "next/navigation";
import { useModal } from "../providers/ModalProvider";
import { on } from "events";
import { getDangerActionConfirmationModal } from "../Modals/DangerActionConfirmation";
import Modal from "../Modals/Modal";
import { ModalProps } from "@/types/modal-props";
import SmartFormula from "../SmartFormula";
import FormModal from "../Modals/FormModal";
import { useGetSmartFormula } from "@/utils/maturity_matrix";
import { Prettify } from "@/types";
import { toast } from "react-toastify";

const GRADIENT_COLORS = [
  "bg-meta-7/[0.4]",
  "bg-meta-8/[0.4]",
  "bg-meta-8/[0.2]",
  "bg-meta-3/[0.2]",
  "bg-meta-3/[0.4]",
] as const;

export type ModeType = "create" | "edit";

type MLevel = {
  level: number;
  assessments: string;
};

type MaturityMatrixTableProps = {
  clientId: number;
  onSelectedAssessmentsChange?: (assessments: selectedAssessment[]) => void;
  onChange?: ({
    selectedAssessment,
    isNew,
  }: {
    selectedAssessment: selectedAssessment;
    isNew: boolean;
  }) => void;
  selectedAssessments?: selectedAssessment[];
  mode?: ModeType;
  startDate?: string;
  endDate?: string;
  matrixId: number;
};

const M_LEVELS = [
  "1 Acute problematiek",
  "2 Niet zelfredzaam",
  "3 Beperkt zelfredzaam",
  "4 Voldoende zelfredzaam",
  "5 Volledig zelfredzaam",
] as const;

export default function MaturityMatrixTable({
  clientId,
  matrixId,
  onSelectedAssessmentsChange,
  onChange,
  selectedAssessments,
  mode = "create",
  startDate,
  endDate,
}: MaturityMatrixTableProps) {
  const { data: domains, isLoading } = useDomains();
  console.log("domains", domains);
  console.log("selectedAssessments", selectedAssessments);

  const handleSelectedAssessmentsChange = useCallback(
    (selectedAssessment: selectedAssessment, domain: MDomain, level: MLevel) => {
      let prev = selectedAssessments;
      // Not undefined
      if (prev) {
        const isNew: boolean =
          prev.filter((assessment) => assessment.domain_id === domain.id).length === 0;
        // Remove the old level if it exists for the same domain
        prev = prev.filter((assessment) => assessment.domain_id !== domain.id);

        onChange?.({
          selectedAssessment: selectedAssessment,
          isNew: isNew,
        });

        onSelectedAssessmentsChange?.([...prev, selectedAssessment]);
      }
    },
    [selectedAssessments]
  );

  const handleDomainLevelRemove = useCallback(
    (selectedAssessment: selectedAssessment, domain: MDomain, level: MLevel) => {
      let prev = selectedAssessments;

      if (prev) {
        const filteredAssessments = prev.filter(
          (clientLevel) =>
            !(clientLevel.domain_id === domain.id && clientLevel.level === level.level)
        );

        onChange?.({
          selectedAssessment: selectedAssessment,
          isNew: false,
        });

        onSelectedAssessmentsChange?.(filteredAssessments);
      }
    },
    [selectedAssessments]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <table className="table-fixed w-full min-w-[900px]">
      <thead>
        <tr>
          <th className="border border-stroke bg-yellow-400 text-slate-800  text-lg">Domein</th>
          {M_LEVELS.map((level, index) => (
            <th
              className={cn(
                GRADIENT_COLORS[index],
                "px-5 py-2 border border-stroke w-1/6 text-black"
              )}
              key={level}
            >
              {level}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {domains.map((domain, index) => (
          <tr key={domain.name}>
            <td className="w-1/8 align-top border border-stroke p-2 font-bold bg-yellow-400 text-slate-800  text-lg">
              {domain.name}
            </td>
            {domain.levels.map((level) => (
              <td
                key={level.level}
                className="align-top w-1/6 border border-stroke whitespace-pre-wrap"
              >
                <MatrixItem
                  mode={mode}
                  key={`${domain.id}-${level.level}`}
                  selected={isClientLevelSelected(selectedAssessments, domain.id, level.level)}
                  clientId={clientId}
                  matrixId={matrixId}
                  assessmentId={5}
                  startDate={startDate}
                  endDate={endDate}
                  assessment={getClientSelectedAssessment(
                    selectedAssessments,
                    domain.id,
                    level.level,
                  )}
                  setAssessment={(assessment) => {
                    handleSelectedAssessmentsChange(assessment, domain, level);
                  }}
                  onRemove={(assessment) => handleDomainLevelRemove(assessment, domain, level)}
                  onClick={
                    isClientLevelSelected(selectedAssessments, domain.id, level.level)
                      ? () => {}
                      : (assessment) => handleSelectedAssessmentsChange(assessment, domain, level)
                  }
                >
                  {parseAssessments(level.assessments).map((goal, index) => {
                    return <p key={index}>◾ {goal}</p>;
                  })}
                </MatrixItem>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function parseAssessments(assessments: string) {
  try {
    return JSON.parse(assessments.replace(/'/g, '"'));
  } catch (error) {
    console.error("Invalid string format");
    return [];
  }
}

function MatrixItem({
  children,
  selected = false,
  clientId,
  assessment,
  setAssessment,
  onClick,
  onRemove,
  mode = "create",
  startDate,
  endDate,
  matrixId,
}: {
  children: React.ReactNode;
  clientId: number;
  assessment: selectedAssessment;
  setAssessment: (assessment: selectedAssessment) => void;
  selected?: boolean;
  onClick?: (assessment: selectedAssessment) => void;
  onRemove?: (assessment: selectedAssessment) => void;
  mode?: ModeType;
  startDate?: string;
  endDate?: string;
  matrixId: number;
  assessmentId: number;
}) {
  console.log("assessment", assessment);
  const router = useRouter();
  const { domain_id: domainId, level: levelId } = assessment; // for backward compatibility

  const { open: openSmartFormulaModal, close: closeSmartFormulaModal } = useModal(
    (modelProps: ModalProps) => {
      return (
        <SmartFormulaGeneratorModal {...modelProps}>
          <SmartFormula
            clientId={clientId}
            domainId={domainId}
            levelId={levelId}
            startDate={startDate}
            endDate={endDate}
            onSave={(goal_ids, edited_smart_formula_goals) => {
              // set the assessment
              setAssessment({
                domain_id: domainId,
                level: levelId,
                goal_ids: goal_ids,
                assessment_id: null
              });

              closeSmartFormulaModal();
            }}
          />
        </SmartFormulaGeneratorModal>
      );
    }
  );

  return (
    <div
      className={cn(
        " p-2 min-h-[250px] relative group overflow-hidden",
        selected &&
          "border-2 rounded-md bg-purple-100 border-purple-500 text-slate-800  cursor-default",
        !selected && mode === "create" && "hover:bg-gray",
        mode === "create" ? "border-dashed cursor-pointer" : "border-solid cursor-default"
      )}
      onClick={() => {
        if (mode === "create") {
          onClick({
            domain_id: domainId,
            level: levelId,
            goal_ids: [],
            assessment_id: 0
          });
        }
      }}
    >
      {children}
      {selected && (
        <span className="absolute right-2 bottom-2 text-purple-500">
          {assessment.goal_ids.length}
          <Icon name="flag-triangle-right" size={23} />
        </span>
      )}

      {/* {selected && (
        <span
          className="absolute right-2 top-2 rounded-full hover:bg-purple-300 text-purple-500 cursor-pointer"
          onClick={() =>
            onRemove({
              domain_id: domainId,
              level: levelId,
            })
          }
        >
          <Icon name="x" size={23} />
        </span>
      )} */}

      {selected && (
        <div className="invisible absolute group-hover:visible transition transform translate-y-8 group-hover:translate-y-0 ease-in-out bg-purple-300 w-full right-0 left-0 top-0 bottom-0 z-0 p-2 flex flex-col justify-center">
          {mode !== "edit" && (
            <span
              className="absolute right-2 top-2 rounded-full hover:bg-purple-200 text-purple-500 cursor-pointer"
              onClick={() => onRemove(assessment)}
            >
              <Icon name="x" size={23} className="block" />
            </span>
          )}

          {assessment.goal_ids.length ? (
            mode === "edit" ? (
              <button
                type="button"
                className="px-4 py-2 bg-purple-600 text-purple-100 hover:bg-purple-700 rounded-lg font-bold mb-2"
                onClick={() => {
                  // This should have been Accessment ID instead of goal_ids
                  router.push(`/clients/${clientId}/questionnaire/maturity-matrix/${matrixId}/assessment/${assessment.assessment_id}/goals`);
                }}
              >
                <Icon name="flag-triangle-right" /> {assessment.goal_ids.length}{" "}
                {assessment.goal_ids.length > 1 ? "Doelen" : "Doel"}
              </button>
            ) : (
              <div className="font-bold text-center">
                <Icon name="flag-triangle-right" /> {assessment.goal_ids.length}{" "}
                {assessment.goal_ids.length > 1 ? "Doelen" : "Doel"}
              </div>
            )
          ) : (
            <button
              type="button"
              className="px-4 py-2 bg-purple-600 text-purple-100 hover:bg-purple-700 rounded-lg font-bold"
              onClick={() => {
                if (!startDate || !endDate) {
                  toast.warning("Selecteer eerst de start- en einddatum.");
                } else {
                  openSmartFormulaModal({});
                }
              }}
            >
              <Icon name="sparkles" /> Smart Formula
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function isClientLevelSelected(
  selectedAssessments: DomainLevels | SetDomainLevelReqDto[] | selectedAssessment[],
  domainId: number,
  levelId: number
) {
  return selectedAssessments.some(
    (clientLevel) => clientLevel.domain_id === domainId && clientLevel.level === levelId
  );
}

function getClientSelectedAssessment(
  assessments: selectedAssessment[],
  domainId: number,
  levelId: number
) {
  const found_assessment = assessments.find(
    (assessment: selectedAssessment) =>
      assessment.domain_id === domainId && assessment.level === levelId
  );

  if (found_assessment) {
    return found_assessment;
  } else {
    return {
      domain_id: domainId,
      level: levelId,
      goal_ids: [],
      assessment_id: 0
    };
  }
}

export function SmartFormulaGeneratorModal({
  children,
  additionalProps,
  ...props
}: ModalProps & { children: React.ReactNode }) {
  return (
    <FormModal
      title={
        <div>
          <Icon name="sparkles" className="mr-2" />
          <span>Smart Formula Generator</span>
        </div>
      }
      {...props}
      {...additionalProps}
    >
      {children}
    </FormModal>
  );
}
