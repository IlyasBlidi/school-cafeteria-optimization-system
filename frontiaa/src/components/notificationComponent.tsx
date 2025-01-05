// src/components/notifications/NotificationComponent.tsx
'use client'
import React, { useEffect } from "react";
import { Bell } from "lucide-react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotifications } from "@/Contexts/NotificationContext";
import { useToast } from "@/hooks/use-toast";

function NotificationComponent() {
  const { addNotification, notifications, markAsRead, unreadCount } = useNotifications();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Or however you store your token
    if (!token) {
      console.error("Token undefined!");
      return;
    }

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => {
        console.log("STOMP Debug:", str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log("Connected to WebSocket");
      
      const userId = localStorage.getItem('userId');
      client.subscribe(`/user/${userId}/queue/notifications`, (message) => {
        try {
          const notification = JSON.parse(message.body);
          addNotification({
            title: notification.title,
            message: notification.message,
            type: notification.type,
            metadata: undefined,
            read: undefined,
            userName: "",
            timeAgo: "",
            actions: []
          });
          
          toast({
            title: notification.title,
            description: notification.message,
            duration: 3000,
          });
        } catch (error) {
          console.error('Error processing notification:', error);
        }
      });
      
    };

    client.onStompError = (frame) => {
      console.error('STOMP protocol error:', frame);
      toast({
        title: "Connection Error",
        description: "Failed to connect to notification service",
        variant: "destructive",
      });
    };

    client.activate();

    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, [addNotification, toast]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {unreadCount}
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <ScrollArea className="h-[300px] p-4">
          {notifications.length === 0 ? (
            <div className="text-center text-sm text-gray-500">
              No notifications
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification: { id: React.Key | null | undefined; isRead: any; title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; message: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; timeAgo: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg cursor-pointer ${
                    notification.isRead ? 'bg-gray-50' : 'bg-blue-50'
                  }`}
                  onClick={() => markAsRead(notification.id.toString())}
                >
                  <h4 className="font-medium">{notification.title}</h4>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <span className="text-xs text-gray-400">{notification.timeAgo}</span>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NotificationComponent;