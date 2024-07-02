import { useClientLevels, useDomains } from "@/utils/domains";
import { SmartFormulaGoal, useSmartFormula } from "@/utils/maturity_matrix";
import { useState } from "react";
import Button from "./buttons/Button";

type SmpartFormulaProps = {
  clientId: number;
  domainId: number;
  levelId: number;
};

export default function SmartFormula({ clientId, domainId, levelId }: SmpartFormulaProps) {
  const { data: domains, isLoading } = useDomains();
  const { data: clientLevels, isLoading: isLoadingClientLevels } = useClientLevels(clientId);

  const [smartFormulaGoals, setSmartFormulaGoals] = useState<SmartFormulaGoal[]>([]);

  const { generateSmartFormula } = useSmartFormula(clientId, domainId, levelId);

  if (isLoading || isLoadingClientLevels) {
    return "Loading...";
  }

  const handleClick = async () => {
    const goals = await generateSmartFormula();
    setSmartFormulaGoals(goals);
  };

  return (
    <div className="text-left overflow-y-auto bg-red">
      {smartFormulaGoals.map((goal, index) => {
        return (
          <div key={index}>
            <h2>{goal.goal_name}</h2>
            {goal.objectives.map((objective, index) => (
              <div key={index}>
                <h3>{objective.specific}</h3>
                <p>{objective.measurable}</p>
                <p>{objective.achievable}</p>
                <p>{objective.relevant}</p>
                <p>{objective.time_bound}</p>
              </div>
            ))}
          </div>
        );
      })}
      <Button onClick={handleClick}>Generate Smart Formula</Button>
    </div>
  );
}
