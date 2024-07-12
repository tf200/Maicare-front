import axios from "axios";


type TemplateType = "risk_assessment" | "collaboration_agreement" | "consent_declaration";

type QuestionnaireTemplateParams = { questionnaireId: string, templateType: TemplateType };
type QuestionnaireTemplateResDto = { link: string };

export const getQuestionnaireTemplate = async (params: QuestionnaireTemplateParams) => {

    if(!params.questionnaireId || !params.templateType){
        throw("questionnaireId and templateType are required");
    }

    try {
        const response = await axios.post<QuestionnaireTemplateResDto>(`/api/questionnaire/${ params.questionnaireId }/template`, { template_type: params.templateType });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};