import React, { FunctionComponent } from "react";
import { ModalProps } from "@/types/modal-props";
import WarningModal from "@/components/Modals/WarningModal";

type ConfigProps = {
  msg: string;
  title: string;
};

type WarningActionConfirmationProps = ConfigProps & ModalProps;

export default function WarningActionConfirmation({
  open,
  onClose,
  msg,
  title,
  additionalProps,
}: WarningActionConfirmationProps) {
  return (
    <WarningModal
      open={open}
      onClose={onClose}
      modalTitle={title}
      onCancel={additionalProps?.onCancel}
      onConfirm={additionalProps?.onConfirm}
    >
      <p>{msg}</p>
    </WarningModal>
  );
};


export function getWarningActionConfirmationModal(props: ConfigProps) {
  return (modalProps: ModalProps) => <WarningActionConfirmation {...modalProps} {...props} />;
}
