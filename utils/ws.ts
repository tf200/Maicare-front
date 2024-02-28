import { useEffect, useState } from "react";
const endpoint = process.env.NEXT_PUBLIC_WS_URL;

class WebSocketSingleton {
  private static instance: WebSocket;
  static getInstance() {
    if (!this.instance) {
      const params = new URLSearchParams();
      const token = localStorage.getItem("a");
      if (!token) {
        throw new Error("Token not found");
      }
      params.append("token", token);
      console.log("Connecting to WS", `${endpoint}?${params.toString()}`);
      this.instance = new WebSocket(`${endpoint}?${params.toString()}`);
    }
    return this.instance;
  }
}

export class WebSocketService {
  private ws: WebSocket;
  constructor() {
    this.ws = WebSocketSingleton.getInstance();
  }
  send(data: any) {
    this.ws.send(JSON.stringify(data));
  }
  onMessage(callback: (data: any) => void) {
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      callback(data);
    };
  }
  onError(callback: (event: Event) => void) {
    this.ws.onerror = (event) => {
      callback(event);
    };
  }
  close() {
    this.ws.close();
  }
}

export const useWs = () => {
  const [ws, setWs] = useState<WebSocketService>();
  // useEffect(() => {
  //   try {
  //     const wsService = new WebSocketService();
  //     setWs(wsService);
  //     return () => {
  //       wsService.close();
  //     };
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, []);
  return ws;
};
