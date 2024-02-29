import { useEffect, useState } from "react";
import WSRequest from "@/types/ws/requests";
const endpoint = process.env.NEXT_PUBLIC_WS_URL;

function createWebSocket() {
  const params = new URLSearchParams();
  const token = localStorage.getItem("a");
  if (!token) {
    throw new Error("Token not found");
  }
  params.append("token", token);
  return new WebSocket(`${endpoint}?${params.toString()}`);
}

export class WebSocketService {
  private ws: WebSocket;
  constructor() {
    this.ws = createWebSocket();
  }
  send(data: WSRequest) {
    this.ws.send(JSON.stringify(data));
  }
  onMessage(callback: (data: any) => void) {
    this.ws.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      callback(data);
    });
  }
  onError(callback: (event: Event) => void) {
    this.ws.addEventListener("error", (event) => {
      callback(event);
    });
  }
  close() {
    this.ws.close();
  }
  onOpen(callback: (event: Event) => void) {
    this.ws.onopen = (event) => {
      callback(event);
    };
  }
  onClose(callback: (event: CloseEvent) => void) {
    this.ws.onclose = (event) => {
      callback(event);
    };
  }
  reconnect() {
    const prevWs = this.ws;
    this.ws = createWebSocket();
    this.ws.onopen = prevWs.onopen;
    this.ws.onclose = prevWs.onclose;
    this.ws.onmessage = prevWs.onmessage;
    this.ws.onerror = prevWs.onerror;
    prevWs.close();
  }
}

export const useWs = () => {
  const [ws, setWs] = useState<WebSocketService>();
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    try {
      const wsService = new WebSocketService();
      setWs(wsService);
      wsService.onOpen(() => {
        setIsConnected(true);
      });
      wsService.onClose(() => {
        setIsConnected(false);
        wsService.reconnect();
      });
      return () => {
        wsService.close();
      };
    } catch (e) {
      console.error(e);
    }
  }, []);
  return { ws, isConnected };
};
