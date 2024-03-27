export type NewIncidentReqDto = {
  date_reported: string;
  date_of_incident: string;
  reported_by: number;
  reported_by_name?: string;
  involved_children: number[];
  involved_children_name?: string[];
  location: string;
  description: string;
  action_taken: string;
  follow_up_required: boolean;
  follow_up_date: string;
  notes: string;
  status: string;
};
