export type NewMeasurmentReqDto = {
  id?: number;
  date?: string;
  client?: number;
  value: number;
  measurement_type: string;
};
