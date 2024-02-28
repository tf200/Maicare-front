"use client";

import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
} from "react";
import { useWs, WebSocketService } from "@/utils/ws";

export const WSContext = createContext<WebSocketService | null>(null);

const WsProvider: FunctionComponent<PropsWithChildren> = (props) => {
  // const ws = useWs();
  return <WSContext.Provider value={null}>{props.children}</WSContext.Provider>;
};

export default WsProvider;
