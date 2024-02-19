"use client";

import { FunctionComponent, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type Props = {
  id?: string;
};

const ModalPortal: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  id,
}) => {
  return createPortal(children, document.getElementById("modal-root"), id);
};

export default ModalPortal;
