"use client";
import { FC, useCallback, useEffect, useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import NewOrder from "@/components/ui/newOrder";
import { AppSidebar } from "@/components/adminSidebar/appSidebar";
import { Separator } from "@radix-ui/react-separator";
import { commandService } from "@/services/commandService";
import { useWebSocket } from "@/hooks/useSocketHook";
import { NotificationProvider } from "@/Contexts/NotificationContext";
import { CommandRecieved, Status } from "@/types/types";

const Home: FC = () => {
  const [orders, setOrders] = useState<CommandRecieved[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const onCommand = useCallback((newCommand: CommandRecieved) => {
    setOrders((prevOrders) => {
      const exists = prevOrders.some((order) => order.id === newCommand.id);
      return exists
        ? prevOrders.map((order) =>
            order.id === newCommand.id ? newCommand : order
          )
        : [...prevOrders, newCommand];
    });
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/v1/commands");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data: CommandRecieved[] = await response.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useWebSocket({
    onCommand,
  });

  const handleStatusChange = async (orderId: string, newStatus: Status) => {
    await commandService.setCommandStatus(orderId, newStatus);
    console.log(`Changing status of order ${orderId} to ${newStatus}`);
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleRemove = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  const ordersByStatus = {
    NEW: orders.filter((order) => order.status === "NEW"),
    COOKING: orders.filter((order) => order.status === "COOKING"),
    READY: orders.filter((order) => order.status === "READY"),
    COMPLETED: orders.filter((order) => order.status === "COMPLETED"),
  };

  return (
    <SidebarProvider>
      <NotificationProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex-1 h-full w-full overflow-hidden font-general-sans">
            <header className="sticky top-0 z-10 bg-white border-b">
              <div className="flex items-center h-16 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mx-4 h-4" />
                <h1 className="text-[17px] font-general-sans font-medium">
                  Welcome Back Admin,
                </h1>
              </div>
            </header>
            <div className="h-full flex flex-col p-6 gap-[4rem]">
              {loading && <p>Loading orders...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {!loading && !error && (
                <div className="flex-1 overflow-auto">
                  <div className="grid grid-cols-4 gap-6">
                    {(["NEW", "COOKING", "READY", "COMPLETED"] as const).map(
                      (status) => (
                        <div key={status} className="space-y-4">
                          <h2 className="text-lg font-medium text-gray-600">
                            {status.charAt(0).toUpperCase() + status.slice(1)} (
                            {ordersByStatus[status].length})
                          </h2>
                          {ordersByStatus[status].map((order) => (
                            <NewOrder
                              orderNumber={order.id.slice(0, 6)}
                              studentName={order.user.firstName}
                              studentClass={"IID3"}
                              total={order.totalPrice}
                              timeElapsed={"12.00"}
                              key={order.id}
                              {...order}
                              onStatusChange={(newStatus) =>
                                handleStatusChange(order.id, newStatus)
                              }
                              onRemove={() => handleRemove(order.id)}
                              items={order.commandArticles}
                            />
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </SidebarInset>
      </NotificationProvider>
    </SidebarProvider>
  );
};

export default Home;
