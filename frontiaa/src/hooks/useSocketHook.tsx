import { CommandRecieved } from "@/api/types";
import { Client, IMessage } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";

interface UseWebSocketProps {
    onCommand?: (command: CommandRecieved) => void;
  }
  
  export const useWebSocket = ({ onCommand }: UseWebSocketProps) => {
    const [client, setClient] = useState<Client | null>(null);
  
    useEffect(() => {
      const stompClient = new Client({
        webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
        reconnectDelay: 2000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        debug: (msg) => console.log('[WebSocket Debug]', msg),
        onWebSocketError: (error) => {
          console.error('WebSocket Error:', error);
        },
        onDisconnect: (frame) => {
          console.log('WebSocket Disconnected:', frame);
        }
      });
  
      stompClient.onConnect = () => {
        console.log('WebSocket Connected');
        stompClient.subscribe('/topic/Commands', (message: IMessage) => {
          try {
            console.log('Received WebSocket message:', message.body);
            const newCommand: CommandRecieved = JSON.parse(message.body);
            onCommand?.(newCommand);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        });
      };
  
      stompClient.onStompError = (frame) => {
        console.error('Broker reported error:', frame.headers['message']);
        console.error('Additional details:', frame.body);
      };
  
      stompClient.activate();
      setClient(stompClient);
  
      return () => {
        stompClient.deactivate();
      };
    }, [onCommand]);
  
    return { client };
  };