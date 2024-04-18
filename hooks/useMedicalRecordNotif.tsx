import { useModal } from "@/components/providers/ModalProvider";
import MedicationRecordModal from "@/components/Modals/MedicationRecordModal";
import { useMedicationRecordFetcher } from "@/utils/medication-records";
import { getConfirmationModal } from "@/components/Modals/Modal";

export const useMedicalRecordNotif = () => {
  const { open: report } = useModal(MedicationRecordModal);
  const { open: informTaken } = useModal(
    getConfirmationModal({
      modalTitle: "Medicatie ingenomen",
      children:
        "Je hebt deze medicatie al ingenomen. Wil je dit nogmaals rapporteren?",
    })
  );
  const { open: informMissed } = useModal(
    getConfirmationModal({
      modalTitle: "Medicatie gemist",
      children:
        "Je hebt deze medicatie nog niet ingenomen. Wil je dit rapporteren?",
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
