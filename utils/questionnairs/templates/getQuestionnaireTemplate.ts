import { TemplateType } from "@/components/QuestionnaireDownloadButton";
import axios from "axios";



type QuestionnaireTemplateParams = { questionnaireId: string | number, templateType: TemplateType };
type QuestionnaireTemplateResDto = { link: string };

export const getQuestionnaireTemplate = async ({ questionnaireId, templateType }: QuestionnaireTemplateParams) => {

    if (!questionnaireId || !templateType) {
        throw ("questionnaireId and templateType are required");
    }

    try {
        const response = await axios.post<QuestionnaireTemplateResDto>(`/questionnaires/generate-document-link`, { id: questionnaireId, type: templateType });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};