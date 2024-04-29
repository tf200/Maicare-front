import { useModal } from "@/components/providers/ModalProvider";
import MedicationRecordModal from "@/components/Modals/MedicationRecordModal";
import { useMedicationRecordFetcher } from "@/utils/medication-records";
import { getAckModal } from "@/components/Modals/Modal";

export const useMedicalRecordNotif = () => {
  const { open: report } = useModal(MedicationRecordModal);
  const { open: informTaken } = useModal(
    getAckModal({
      modalTitle: "Medicatie ingenomen",
      children: "Dit medicijn werd gerapporteerd als ingenomen.",
    })
  );
  const { open: informMissed } = useModal(
    getAckModal({
      modalTitle: "Medicatie gemist",
      children: "Dit medicijn werd gerapporteerd als gemist.",
    })
  );
  const { fetch } = useMedicationRecordFetcher();
  return {
    reportMedication: async (medicationId: number) => {
      const data = await fetch(medicationId);
      if (data.status === "awaiting") {
        report({
          record: data,
        });
      } else if (data.status === "taken") {
        informTaken({});
      } else if (data.status === "not_taken") {
        informMissed({});
      }
    },
  };
};
