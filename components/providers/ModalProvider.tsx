"use client";

import React, {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { ModalProps } from "@/types/modal-props";

const ModalContext = React.createContext({
  OpenedModal: null,
  modals: [],
  push: (modal: FunctionComponent<ModalProps>) => {},
  pop: () => {},
  removeModal: (modal: FunctionComponent<ModalProps>) => {},
});

const ModalProvider: FunctionComponent<PropsWithChildren> = (props) => {
  const [OpenedModal, setOpenedModal] =
    useState<FunctionComponent<ModalProps>>(null);
  const [modals, setModals] = useState<FunctionComponent<ModalProps>[]>([]);
  const push = useCallback(
    (modal: FunctionComponent) => {
      setModals((modals) => [...modals, modal]);
      setOpenedModal(() => modal);
    },
    [setModals, setOpenedModal]
  );
  const pop = useCallback(() => {
    setModals((modals) => {
      modals.pop();
      if (modals.length === 0) {
        setOpenedModal(() => modals[modals.length - 1]);
      }
      return modals;
    });
  }, [setModals, setOpenedModal]);
  const removeModal = useCallback(
    (modal: FunctionComponent) => {
      setModals((modals) => {
        const index = modals.indexOf(modal);
        if (index !== -1) {
          modals.splice(index, 1);
        }
        return modals;
      });
    },
    [setModals]
  );
  return (
    <ModalContext.Provider
      value={{
        OpenedModal,
        modals,
        push,
        pop,
        removeModal,
      }}
    >
      <>
        {props.children}
        {OpenedModal && <OpenedModal open={true} onClose={pop} />}
      </>
    </ModalContext.Provider>
  );
};

export default ModalProvider;

export function useModal(Modal: FunctionComponent<ModalProps>) {
  const { push, removeModal } = useContext(ModalContext);
  return {
    open: (callbacks: { [key: string]: () => void }) => {
      push((props) => <Modal {...props} callbacks={callbacks} />);
    },
    close: removeModal,
  };
}
