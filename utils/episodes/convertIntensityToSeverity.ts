import { DiagnosisSeverity } from "@/types/dagnosis-servity";

export function convertIntensityToSeverity(
  intensity: number
): DiagnosisSeverity {
  if (intensity <= 2) return "Mild";
  if (intensity <= 6) return "Moderate";
  return "Severe";
}
