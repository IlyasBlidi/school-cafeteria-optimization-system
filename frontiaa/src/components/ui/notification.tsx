"use client";
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
import { Notification } from "@/types/types";
import { user } from "@/lib/utils";
import { create } from "zustand";
import { toast, useToast } from "@/hooks/use-toast";

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  setNotifications: (notifications: Notification[]) => void;
}

const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  setNotifications: (notifications) => set({ notifications }),
}));

function WebSocketConnection() {
  const { addNotification, setNotifications } = useNotificationStore();
    const { toast } = useToast();


  useEffect(() => {
    const token = user.token;
    if (!token) return;

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
      onConnect: () => {
        console.log("Connected to WebSocket");

        client.subscribe(
          `/user/${user.email}/queue/notifications`,
          (message) => {
            try {
              const notification = JSON.parse(message.body) as Notification;
              console.log("Received notification:", notification);
        
              addNotification(notification);
        
              toast(notification.message, {
                title: notification.title,
                description: notification.message || "You have a new notification!",
                duration: 3000,
              });
            } catch (error) {
              console.error("Error parsing notification:", error);
            }
          }
        );
        

        fetch("http://localhost:8080/api/v1/notifications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data: Notification[]) => setNotifications(data))
          .catch((error) => console.error("Fetch error:", error));
      },
    });

    client.activate();

    return () => {
      if (client.connected) {
        client.deactivate();
      }
    };
  }, [addNotification, setNotifications]);

  return null;
}

export function NotificationCenter() {
  const [open, setOpen] = React.useState(false);
  const notifications = useNotificationStore(
    (state) => state.notifications || []
  );

  return (
    <>
      <WebSocketConnection />
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 relative">
            <Bell className="h-5 w-5" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-limouni flex items-center justify-center text-[10px] text-white">
                {notifications.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[300px] p-0"
          align="end"
          sideOffset={8}
        >
          <div className="flex flex-col max-h-[calc(100vh-120px)]">
            <ScrollArea className="flex-1">
              <div className="divide-y">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div
                      key={`${notification.id}-${index}`}
                      className="flex items-start gap-3 p-4"
                    >
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">
                            {notification.userName}
                          </span>{" "}
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.timeAgo}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className="w-2 h-2 rounded-full bg-limouni mt-2" />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-24 text-gray-500">
                    <p>No notifications available.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
