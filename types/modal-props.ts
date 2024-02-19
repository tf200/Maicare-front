export type ModalProps = {
  open: boolean;
  onClose: () => void;
  callbacks?: {
    [key: string]: () => void;
  };
};
