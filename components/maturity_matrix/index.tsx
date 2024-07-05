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

const GRADIENT_COLORS = [
  "bg-meta-7/[0.4]",
  "bg-meta-8/[0.4]",
  "bg-meta-8/[0.2]",
  "bg-meta-3/[0.2]",
  "bg-meta-3/[0.4]",
] as const;

type MLevel = {
  level: number;
  assessments: string;
};

type MaturityMatrixTableProps = {
  clientId: number;
  onDomainLevelsChange?: (domainLevels: selectedAssessment[]) => void;
  onChange?: ({
    selectedAssessments,
    isNew,
  }: {
    selectedAssessments: selectedAssessment;
    isNew: boolean;
  }) => void;
  selectedMatrixAssessments?: selectedAssessment[];
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
  onDomainLevelsChange,
  onChange,
  selectedMatrixAssessments,
}: MaturityMatrixTableProps) {
  const { data: domains, isLoading } = useDomains();
  // const { data: clientLevels, isLoading: isLoadingClientLevels } = useClientLevels(clientId);

  const [selectedAssessments, setSelectedAssessments] = useState<selectedAssessment[]>(
    // clientLevels
    //   ? clientLevels.map((domainLevel) => ({
    //       domain_id: domainLevel.domain_id,
    //       level: domainLevel.level,
    //     }))
    //   : []
    selectedMatrixAssessments || []
  );

  // useEffect(() => {
  //   if (clientLevels) {
  //     setSelectedAssessments(
  //       // parse domain levels to SetDomainLevelReqDto
  //       clientLevels.map((domainLevel) => ({
  //         domain_id: domainLevel.domain_id,
  //         level: domainLevel.level,
  //       }))
  //     );
  //   }
  // }, [clientLevels]);

  useEffect(() => {
    if (selectedAssessments && onDomainLevelsChange) {
      onDomainLevelsChange(selectedAssessments);
    }
  }, [selectedAssessments]);

  const handleDomainLevelChange = useCallback(
    (selectedAssessment: selectedAssessment, domain: MDomain, level: MLevel) => {
      setSelectedAssessments((prev) => {
        // Not undefined
        if (prev) {
          const isNew: boolean =
            prev.filter((domainLevel) => domainLevel.domain_id === domain.id).length === 0;
          // Remove the old level if it exists for the same domain
          prev = prev.filter((domainLevel) => domainLevel.domain_id !== domain.id);

          onChange?.({
            selectedAssessments: selectedAssessment,
            isNew: isNew,
          });

          return [...prev, selectedAssessment];
        }
      });
    },
    []
  );

  const handleDomainLevelRemove = useCallback(
    (selectedDomainLevel: selectedAssessment, domain: MDomain, level: MLevel) => {
      setSelectedAssessments((prev) => {
        if (prev) {
          return prev.filter(
            (clientLevel) =>
              !(clientLevel.domain_id === domain.id && clientLevel.level === level.level)
          );
        }
      });
    },
    []
  );

  if (isLoading /*|| isLoadingClientLevels || selectedAssessments === undefined*/) {
    return <div>Loading...</div>;
  }

  return (
    <table className="table-fixed w-full">
      <thead>
        <tr>
          <th className="border border-stroke bg-yellow-400 text-black text-lg">Domein</th>
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
            <td className="w-1/8 align-top border border-stroke p-2 font-bold bg-yellow-400 text-black text-lg">
              {domain.name}
            </td>
            {domain.levels.map((level) => (
              <td
                key={level.level}
                className="align-top w-1/6 border border-stroke whitespace-pre-wrap"
              >
                <MatrixItem
                  key={`${domain.id}-${level.level}`}
                  selected={isClientLevelSelected(selectedAssessments, domain.id, level.level)}
                  clientId={clientId}
                  assessment={getClientSelectedAssessment(
                    selectedAssessments,
                    domain.id,
                    level.level
                  )}
                  setAssessment={(assessment) => {
                    handleDomainLevelChange(assessment, domain, level);
                  }}
                  onRemove={(selectedDomainLevel) =>
                    handleDomainLevelRemove(selectedDomainLevel, domain, level)
                  }
                  onClick={
                    isClientLevelSelected(selectedAssessments, domain.id, level.level)
                      ? () => {}
                      : (selectedDomainLevel) =>
                          handleDomainLevelChange(selectedDomainLevel, domain, level)
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
}: {
  children: React.ReactNode;
  clientId: number;
  assessment: selectedAssessment;
  setAssessment: (assessment: selectedAssessment) => void;
  selected?: boolean;
  onClick?: (assessment: selectedAssessment) => void;
  onRemove?: (assessment: selectedAssessment) => void;
}) {
  const router = useRouter();
  const { domain_id: domainId, level: levelId } = assessment; // for backward compatibility
  // const { data: clientSelectedAssessment, isLoading } = useClientSelectedAssessments(
  //   domainId,
  //   levelId
  // );

  // const { data: smartFormulaGoals, isLoading } = useGetSmartFormula(clientId, domainId, levelId);
  const { open: openSmartFormulaModal } = useModal((modelProps: ModalProps) => {
    return (
      <SmartFormulaGeneratorModal {...modelProps}>
        <SmartFormula
          clientId={clientId}
          domainId={domainId}
          levelId={levelId}
          onSave={(goal_ids, edited_smart_formula_goals) => {
            // set the assessment
            setAssessment({
              domain_id: domainId,
              level: levelId,
              goal_ids: goal_ids,
            });
          }}
        />
      </SmartFormulaGeneratorModal>
    );
  });

  // if (selected) console.log("smartFormulaGoals:", domainId, levelId, smartFormulaGoals);

  // console.log(clientSelectedAssessment);

  return (
    <div
      className={cn(
        " p-2 min-h-[250px] cursor-pointer relative group overflow-hidden",
        selected &&
          "border-2 rounded-md border-dashed bg-purple-100 border-purple-500 text-black cursor-default",
        !selected && "hover:bg-gray"
      )}
      onClick={
        () =>
          onClick({
            domain_id: domainId,
            level: levelId,
            goal_ids: [],
          })
        /*
        Pass the selected Assessment to the parent
        {
          "assessment_id": number,
          "maturitymatrix_id": number
        }
        */
      }
    >
      {children}
      {selected && (
        <span className="absolute right-2 bottom-2">
          <Icon name="flag" size={23} className="text-purple-500" />
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
          <span
            className="absolute right-2 top-2 rounded-full hover:bg-purple-200 text-purple-500 cursor-pointer"
            onClick={() =>
              onRemove({
                domain_id: domainId,
                level: levelId,
              })
            }
          >
            <Icon name="x" size={23} className="block" />
          </span>

          {/* {isLoading ? (
            <div>Loading...</div>
          ) : smartFormulaGoals.length ? (
            <button
              className="px-4 py-2 bg-purple-600 text-purple-100 hover:bg-purple-700 rounded-lg font-bold"
              onClick={() => {
                router.push(`/clients/${clientId}/goals/${domainId}`);
              }}
            >
              <Icon name="flag-triangle-right" /> {smartFormulaGoals.length} Goals
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-purple-600 text-purple-100 hover:bg-purple-700 rounded-lg font-bold"
              onClick={() => {
                openSmartFormulaModal({});
              }}
            >
              <Icon name="sparkles" /> Smart Formula
            </button>
          )} */}

          <button
            className="px-4 py-2 bg-purple-600 text-purple-100 hover:bg-purple-700 rounded-lg font-bold"
            onClick={() => {
              openSmartFormulaModal({});
            }}
          >
            <Icon name="sparkles" /> Smart Formula
          </button>
        </div>
      )}
    </div>
  );
}

function isClientLevelSelected(
  clientLevels: DomainLevels | SetDomainLevelReqDto[],
  domainId: number,
  levelId: number
) {
  return clientLevels.some(
    (clientLevel: DomainLevel) =>
      clientLevel.domain_id === domainId && clientLevel.level === levelId
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
