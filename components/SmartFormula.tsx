import { useClientLevels, useDomains } from "@/utils/domains";
import { EditedSmartFormulaGoal, SmartFormulaGoal, useSmartFormula } from "@/utils/maturity_matrix";
import { useEffect, useState } from "react";
import Button from "./buttons/Button";
import Icon from "./Icon";
import { capitalizeFirstLetter } from "@/utils";
import Textarea from "./FormFields/Textarea";
import InputField from "./FormFields/InputField";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";

type SmpartFormulaProps = {
  clientId: number;
  domainId: number;
  levelId: number;
  startDate?: string;
  endDate?: string;
  onSave?: (goal_ids: number[], edited_smart_formula_goals: EditedSmartFormulaGoal[]) => void;
};

const editableSmartFormulaGoalsYupSchema = Yup.object().shape({
  goals: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required(),
        objectives: Yup.array()
          .of(
            Yup.object().shape({
              title: Yup.string().required("Objective title is required"),
              description: Yup.string().required("Objective description is required"),
            })
          )
          .min(1, "At least one objective is required"),
        // .required(),
      })
    )
    .min(1, "At least one goal is required"),
  // .required(),
});

export default function SmartFormula({
  clientId,
  domainId,
  levelId,
  onSave,
  startDate,
  endDate,
}: SmpartFormulaProps) {
  const { data: domains, isLoading } = useDomains();
  const [goalIds, setGoalIds] = useState<number[]>([]);

  const { data: clientLevels, isLoading: isLoadingClientLevels } = useClientLevels(clientId);
  const [smartFormulaGoals, setSmartFormulaGoals] = useState<SmartFormulaGoal[]>([]);
  const { generateSmartFormula, saveSmartFormula, getSmartFormula } = useSmartFormula(
    clientId,
    domainId,
    levelId
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editableSmartFormulaGoals, setEditableSmartFormulaGoals] = useState<
    EditedSmartFormulaGoal[]
  >([]);

  useEffect(() => {
    getSmartFormula()
      .then((goals) => {
        //console.log("Fetched smart formula goals: ", goals);
        //setSmartFormulaGoals(goals);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  useEffect(() => {
    if (smartFormulaGoals) {
      setEditableSmartFormulaGoals(
        smartFormulaGoals.map((goal, index) => {
          return {
            title: goal.goal_name,
            objectives: goal.objectives.map((objective, index) => {
              return {
                title: objective.specific,
                description: `🔹 Measurable: ${objective.measurable}\n\n🔹 Achievable: ${objective.achievable}\n\n🔹 Relevant: ${objective.relevant}\n\n🔹 Time bound: ${objective.time_bound}`,
              };
            }),
          };
        })
      );
    }
  }, [smartFormulaGoals]);

  if (isLoading || isLoadingClientLevels) {
    return "Loading...";
  }

  if (isGenerating) {
    return (
      <div className="text-center">
        <Icon name="sparkles" /> <b>Generating...</b>
      </div>
    );
  }

  const handleClick = async () => {
    setIsGenerating(true);
    const goals = await generateSmartFormula({
      startDate,
      endDate,
    });
    setSmartFormulaGoals(goals);
    setIsGenerating(false);
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    // save editableSmartFormulaGoals
    // Validate editableSmartFormulaGoals

    try {
      const validated = await editableSmartFormulaGoalsYupSchema.validate({
        goals: editableSmartFormulaGoals,
      });
      // save validated data
      const goal_ids = await saveSmartFormula(validated as { goals: EditedSmartFormulaGoal[] });
      setGoalIds(goal_ids);
      setIsSaving(false);
      toast.success("Smart Formula for goals and objective saved successfully");

      if (typeof onSave === "function") {
        onSave(goal_ids, editableSmartFormulaGoals);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="text-left overflow-y-auto">
      <i>
        <Icon name="info" /> Genereer doelen en doelstellingen voor deze periode:{" "}
        <b>
          {startDate} - {endDate}
        </b>
      </i>
      {editableSmartFormulaGoals.map((goal, goal_index) => {
        return (
          <div key={goal_index}>
            <h2 className="font-bold text-xl mb-3 mt-3 text-black">
              {/* <Icon name="flag-triangle-right" /> {capitalizeFirstLetter(goal.title)} */}
              <InputField
                label={
                  <>
                    <Icon name="flag-triangle-right" /> Goal {goal_index + 1}
                  </>
                }
                placeholder="Goal title"
                value={goal.title}
                onChange={(e) => {
                  // update the goal title in editableSmartFormulaGoals
                  const newEditableSmartFormulaGoals = [...editableSmartFormulaGoals];
                  newEditableSmartFormulaGoals[goal_index].title = e.target.value;
                  setEditableSmartFormulaGoals(newEditableSmartFormulaGoals);
                }}
              />
            </h2>
            {goal.objectives.map((objective, index) => (
              <div
                key={`key-${goal_index}-${index}`}
                className="relative mb-5 border-1 p-3 rounded-lg border-dashed bg-white"
              >
                <InputField
                  label={
                    <>
                      <Icon name="minus" /> Objective {index + 1}
                    </>
                  }
                  placeholder="Objective title"
                  value={objective.title}
                  onChange={(e) => {
                    // update the objective title in editableSmartFormulaGoals
                    const newEditableSmartFormulaGoals = [...editableSmartFormulaGoals];
                    newEditableSmartFormulaGoals[goal_index].objectives[index].title =
                      e.target.value;
                    setEditableSmartFormulaGoals(newEditableSmartFormulaGoals);
                  }}
                />
                <Textarea
                  label=""
                  value={objective.description}
                  inputClassName="min-h-[250px]"
                  placeholder="Objective description"
                  onChange={(e) => {
                    // update the objective description in editableSmartFormulaGoals
                    const newEditableSmartFormulaGoals = [...editableSmartFormulaGoals];
                    newEditableSmartFormulaGoals[goal_index].objectives[index].description =
                      e.target.value;
                    setEditableSmartFormulaGoals(newEditableSmartFormulaGoals);
                  }}
                />
                {editableSmartFormulaGoals[goal_index].objectives.length > 1 && (
                  <span
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={() => {
                      // Delete the current objective
                      const newEditableSmartFormulaGoals = [...editableSmartFormulaGoals];
                      newEditableSmartFormulaGoals[goal_index].objectives.splice(index, 1);
                      setEditableSmartFormulaGoals(newEditableSmartFormulaGoals);
                    }}
                  >
                    <Icon name="trash" size={23} className="text-purple-500" />
                  </span>
                )}
              </div>
            ))}
            <div
              className="fled justify-center items-center text-center font-bold text-sm text-purple-500 hover:bg-purple-100 border-purple-200 border-1 cursor-pointer bg-white border-dashed rounded-lg mb-7"
              onClick={() => {
                // Add a new objective for the current goal
                const newEditableSmartFormulaGoals = [...editableSmartFormulaGoals];
                newEditableSmartFormulaGoals[goal_index].objectives.push({
                  title: "",
                  description: `🔹 Measurable: ...\n\n🔹 Achievable: ...\n\n🔹 Relevant: ...\n\n🔹 Time bound: ...`,
                });
                setEditableSmartFormulaGoals(newEditableSmartFormulaGoals);
              }}
            >
              <Icon name="plus" /> Add objective
            </div>
          </div>
        );
      })}
      <div
        className={cn(
          "flex gap-3",
          !!editableSmartFormulaGoals.length ? "justify-between" : "justify-center"
        )}
      >
        <Button onClick={handleClick}>
          <Icon name="sparkles" />
          {smartFormulaGoals.length
            ? "Regenereer Smart Formula opnieuw"
            : "Genereer slimme formule"}
        </Button>

        {!!editableSmartFormulaGoals.length && (
          <Button onClick={handleSubmit}>
            {isSaving ? "Opslaan..." : "Bewaar slimme formule"}
          </Button>
        )}
      </div>
    </div>
  );
}
