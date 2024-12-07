'use client'
import { Client } from '@stomp/stompjs';
import { useState, useEffect } from 'react';
import SockJS from "sockjs-client";


export default function WebSocketComponent() {
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    // Create the client
    const stompClient = new Client({
        webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => {
        console.log('[WebSocket Debug]', str);
      },
      onWebSocketError: (error) => {
        console.error('WebSocket Error:', error);
        
        // Additional error logging
        if (error instanceof Event) {
          console.error('WebSocket Error Details:', {
            type: error.type,
            target: (error.target as WebSocket).url,
            readyState: (error.target as WebSocket).readyState
          });
        }
      },
      onConnect: (frame) => {
        console.log('WebSocket Connected:', frame);
        // Add your subscription logic here
        // For example:
        // stompClient.subscribe('/topic/someEndpoint', (message) => {
        //   console.log('Received message:', message.body);
        // });
      },
      onDisconnect: (frame) => {
        console.log('WebSocket Disconnected:', frame);
      }
    });

    // Activate the client
    stompClient.activate();

    // Save the client in state
    setClient(stompClient);

    // Cleanup function
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  return (
    <div>
      {/* Your component content */}
    </div>
  );
}





