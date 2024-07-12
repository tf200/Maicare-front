import { TemplateType } from "@/components/QuestionnaireDownloadButton";
import api from "@/utils/api";


type QuestionnaireTemplateParams = { questionnaireId: string | number, templateType: TemplateType };
type QuestionnaireTemplateResDto = { link: string };

export const getQuestionnaireTemplate = async ({ questionnaireId, templateType }: QuestionnaireTemplateParams) => {

    if (!questionnaireId || !templateType) {
        throw ("questionnaireId and templateType are required");
    }

    try {
        const response = await api.post<QuestionnaireTemplateResDto>(`/clients/questionnaires/generate-document-link`, { id: questionnaireId, type: templateType });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};