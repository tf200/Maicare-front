"use client";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../buttons/Button";

import { useRouter } from "next/navigation";
import { useCreateRiskAssessements } from "@/utils/questionnairs/risk-assessements/useAddRiskAssessemets";
import { useGetSingleRiskAssessements } from "@/utils/questionnairs/risk-assessements/useGetSingleRiskAssessemets";
import { useUpdateRiskAssessements } from "@/utils/questionnairs/risk-assessements/useUpdateRiskAssessemets";
import GeneralInfos, {
  GeneralInfosInitialValue,
  GeneralInfosShema,
} from "../Questionnaire/risk-assessements/GeneralInfos";
import Background, {
  BackgroundInitialValue,
  BackgroundShema,
} from "../Questionnaire/risk-assessements/Background";
import RiskFactors, {
  RiskFactorsInitialValue,
  RiskFactorsShema,
} from "../Questionnaire/risk-assessements/RiskFactors";
import BehaviorStatus, {
  BehaviorStatusInitialValue,
  BehaviorStatusShema,
} from "../Questionnaire/risk-assessements/BehaviorStatus";
import BehaviorOffensive, {
  BehaviorOffensiveInitialValue,
  BehaviorOffensiveShema,
} from "../Questionnaire/risk-assessements/BehaviorOffensive";
import ProtectiveFactors, {
  ProtectiveFactorsInitialValue,
  ProtectiveFactorsShema,
} from "../Questionnaire/risk-assessements/ProtectiveFactors";
import Needs, { NeedsInitialValue, NeedsShema } from "../Questionnaire/risk-assessements/Needs";
import Conclusion, {
  ConclusionInitialValue,
  ConclusionShema,
} from "../Questionnaire/risk-assessements/Conclusion";
import Evaluation, { EvaluationShema } from "../Questionnaire/risk-assessements/Evaluation";

type Props = {
  clientId: number;
  mode?: string;
  riskId?: number;
};

const initialValues = {
  ...GeneralInfosInitialValue,
  ...BackgroundInitialValue,
  ...BehaviorStatusInitialValue,
  ...BehaviorOffensiveInitialValue,
  ...RiskFactorsInitialValue,
  ...ProtectiveFactorsInitialValue,
  ...NeedsInitialValue,
  ...ConclusionInitialValue,
  ...EvaluationShema,
};

const formSchema = Yup.object().shape({
  ...GeneralInfosShema,
  ...BackgroundShema,
  ...BehaviorStatusShema,
  ...BehaviorOffensiveShema,
  ...RiskFactorsShema,
  ...ProtectiveFactorsShema,
  ...NeedsShema,
  ...EvaluationShema,
  ...ConclusionShema,
});

const FORMS = [
  { name: "GeneralInfos", component: GeneralInfos },
  { name: "Background", component: Background },
  { name: "BehaviorStatus", component: BehaviorStatus },
  { name: "BehaviorOffensive", component: BehaviorOffensive },
  { name: "RiskFactors", component: RiskFactors },
  { name: "ProtectiveFactors", component: ProtectiveFactors },
  { name: "Needs", component: Needs },
  { name: "Conclusion", component: Conclusion },
  { name: "Evaluation", component: Evaluation },
];

const RiskAssessementsForm: React.FC<Props> = ({ clientId, riskId, mode }) => {
  const router = useRouter();
  const { mutate: createRiskAssessements, isLoading: isCreating } =
    useCreateRiskAssessements(clientId);
  const { data: singleRiskAssessement, isLoading: isSingleColab } = useGetSingleRiskAssessements(
    riskId,
    clientId
  );
  const { mutate: updateRiskAssessements, isLoading: isUpdating } =
    useUpdateRiskAssessements(clientId);
  const isLoading = isUpdating || isCreating;

  const onSubmit = (values) => {
    const payload = { client_id: clientId, ...values };
    const onSuccess = () => {
      router.push(`/clients/${clientId}/questionnaire/risk-assessements`);
    };
    if (!singleRiskAssessement) return createRiskAssessements(payload, { onSuccess });
    return updateRiskAssessements(payload, { onSuccess });
  };
  if (isSingleColab) return <p>Loading...</p>;
  return (
    <Formik
      enableReinitialize={true}
      initialValues={singleRiskAssessement ?? initialValues}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleBlur, touched, handleSubmit, errors }) => (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {FORMS.map(({ name, component: Component }) => (
              <Component
                key={name}
                handleChange={handleChange}
                values={values}
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
              />
            ))}
          </div>
          <Button
            type={"submit"}
            disabled={isLoading}
            isLoading={isLoading}
            formNoValidate={true}
            loadingText={mode === "edit" ? "Bijwerken..." : "Toevoegen..."}
          >
            {mode === "edit" ? "Risicobeoordeling bijwerken" : "Risicobeoordeling maken"}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default RiskAssessementsForm;
