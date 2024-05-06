export type ActivityLogItem = {
  event_type_name: string;
  content_type_name: string;
  id: number;
  event_type: number;
  object_id: string;
  content_type: number;
  object_repr: string;
  object_json_repr: string;
  changed_fields: string;
  user: number;
  user_pk_as_string: string;
  datetime: string;
};

export type ActivityLogRes = Paginated<ActivityLogItem>;
