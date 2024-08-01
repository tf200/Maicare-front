import { TemplateType } from "@/components/QuestionnaireDownloadButton";
import api from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type QuestionnaireTemplateParams = { questionnaireId: string | number; templateType: TemplateType };
type QuestionnaireTemplateResDto = { link: string };

type QuestionnairesTemplateParams = { questionnairesId: number[]; templateType: TemplateType };
type QuestionnairesTemplateResDto = { link: string };

const axiosConfig: AxiosRequestConfig = {
  timeout: 540000,
};

export const getQuestionnaireTemplate = async ({
  questionnaireId,
  templateType,
}: QuestionnaireTemplateParams) => {
  if (!questionnaireId || !templateType) {
    throw "questionnaireId and templateType are required";
  }

  try {
    const response = await api.post<QuestionnaireTemplateResDto>(
      `/clients/questionnaires/generate-document-link`,
      { id: questionnaireId, type: templateType },
      {
        timeout: 540000,
      }
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const getQuestionnairesTemplate = async ({
  questionnairesId,
  templateType,
}: QuestionnairesTemplateParams) => {
  if (!questionnairesId || !templateType) {
    throw "questionnairesId and templateType are required";
  }

  try {
    const response = await api.post<QuestionnairesTemplateResDto>(
      `/clients/questionnaires/generate-document-link`,
      { ids: questionnairesId, type: templateType },
      {
        timeout: 540000,
      }
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};
