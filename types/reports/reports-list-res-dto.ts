import { ReportType } from "@/types/reports/index";

export type ReportsListItem = {
  id: number;
  date: string;
  created: string;
  report_text: string;
  emotional_state: string;
  client: number;
  title: string;
  author: string;
  full_name: string;
  profile_picture: string;
  type: ReportType;
};

export type ReportsListResDto = Paginated<ReportsListItem>;

/*
  NORMAL = "normal", "Normal"
  EXCITED = "excited", "Excited"
  HAPPY = "happy", "Happy"
  SAD = "sad", "Sad"
  ANGRY = "angry", "Angry"
  ANXIOUS = "anxious", "Anxious"
  DEPRESSED = "depressed", "Depressed"
*/
export function showEmojies(emotional_state: string) {
  switch (emotional_state) {
    case "excited":
      return "😃 opgewonden";
    case "happy":
      return "😊 blij";
    case "sad":
      return "😢 verdrietig";
    case "normal":
      return "😐 normaal";
    case "anxious":
      return "😰 angstig";
    case "depressed":
      return "😞 depressief";  
    case "angry":
      return "😡 boos";
    default:
      return "😐";
  }
}