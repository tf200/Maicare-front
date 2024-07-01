import { cn } from "@/utils/cn";
import { useClientLevels, useDomains } from "@/utils/domains";
import { DomainLevel, DomainLevels, MDomain } from "@/types/domains";
import { useCallback, useEffect, useState } from "react";
import { SetDomainLevelReqDto } from "@/types/goals";
import Icon from "../Icon";

const GRADIENT_COLORS = [
  "bg-meta-7/[0.4]",
  "bg-meta-8/[0.4]",
  "bg-meta-8/[0.2]",
  "bg-meta-3/[0.2]",
  "bg-meta-3/[0.4]",
];

type MLevel = {
  level: number;
  assessments: string;
};

type ClientMaturityMatrixProps = {
  clientId: number;
  onDomainLevelsChange?: (domainLevels: SetDomainLevelReqDto[]) => void;
  onChange?: ({
    selectedDomains,
    isNew,
  }: {
    selectedDomains: SetDomainLevelReqDto;
    isNew: boolean;
  }) => void;
};

const M_LEVELS = [
  "1 Acute problematiek",
  "2 Niet zelfredzaam",
  "3 Beperkt zelfredzaam",
  "4 Voldoende zelfredzaam",
  "5 Volledig zelfredzaam",
] as const;

export default function ClientMaturityMatrix({
  clientId,
  onDomainLevelsChange,
  onChange,
}: ClientMaturityMatrixProps) {
  const { data: domains, isLoading } = useDomains();
  const { data: clientLevels, isLoading: isLoadingClientLevels } = useClientLevels(clientId);

  const [selectedDomains, setSelectedDomains] = useState<SetDomainLevelReqDto[]>(
    clientLevels
      ? clientLevels.map((domainLevel) => ({
          domain_id: domainLevel.domain_id,
          level: domainLevel.level,
        }))
      : []
  );

  useEffect(() => {
    if (clientLevels) {
      setSelectedDomains(
        // parse domain levels to SetDomainLevelReqDto
        clientLevels.map((domainLevel) => ({
          domain_id: domainLevel.domain_id,
          level: domainLevel.level,
        }))
      );
    }
  }, [clientLevels]);

  useEffect(() => {
    if (selectedDomains && onDomainLevelsChange) {
      onDomainLevelsChange(selectedDomains);
    }
  }, [selectedDomains]);

  const handleDomainLevelChange = useCallback(
    (selectedDomainLevel: SetDomainLevelReqDto, domain: MDomain, level: MLevel) => {
      setSelectedDomains((prev) => {
        // Not undefined
        if (prev) {
          const isNew: boolean =
            prev.filter((domainLevel) => domainLevel.domain_id === domain.id).length === 0;
          // Remove the old level if it exists for the same domain
          prev = prev.filter((domainLevel) => domainLevel.domain_id !== domain.id);

          onChange?.({
            selectedDomains: selectedDomainLevel,
            isNew: isNew,
          });

          return [...prev, selectedDomainLevel];
        }
      });
    },
    []
  );

  const handleDomainLevelRemove = useCallback(
    (selectedDomainLevel: SetDomainLevelReqDto, domain: MDomain, level: MLevel) => {
      setSelectedDomains((prev) => {
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

  if (isLoading || isLoadingClientLevels || selectedDomains === undefined) {
    return <div>Loading...</div>;
  }

  // const DOMAIN_NAMES = domains.map((domain) => domain.name);
  // const DOMAIN_IDS = domains.map((domain) => domain.id);

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
                  selected={isClientLevelSelected(selectedDomains, domain.id, level.level)}
                  domainId={domain.id}
                  levelId={level.level}
                  onRemove={(selectedDomainLevel) =>
                    handleDomainLevelRemove(selectedDomainLevel, domain, level)
                  }
                  onClick={
                    isClientLevelSelected(selectedDomains, domain.id, level.level)
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
  domainId,
  levelId,
  onClick,
  onRemove,
}: {
  children: React.ReactNode;
  domainId: number;
  levelId: number;
  selected?: boolean;
  onClick: (selectedDomainLevel: SetDomainLevelReqDto) => void;
  onRemove?: (selectedDomainLevel: SetDomainLevelReqDto) => void;
}) {
  return (
    <div
      className={cn(
        " p-2 min-h-[250px] cursor-pointer relative",
        selected &&
          "border-2 rounded-md border-dashed bg-purple-100 border-purple-500 text-black cursor-default",
        !selected && "hover:bg-gray"
      )}
      onClick={() =>
        onClick({
          domain_id: domainId,
          level: levelId,
        })
      }
    >
      {children}
      {selected && (
        <span className="absolute right-2 bottom-2">
          <Icon name="flag" size={23} className="text-purple-500" />
        </span>
      )}

      {selected && (
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
