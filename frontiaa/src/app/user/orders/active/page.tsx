"use client";

import { useCallback, useEffect, useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/userSidebar/appSidebar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { CommandRecieved, Status } from "@/api/types";
import { useWebSocket } from "@/hooks/useSocketHook";
import { commandService } from "@/services/commandService";
import { user } from "@/lib/utils";

const OrderRow = ({ order }: { order: CommandRecieved }) => {
  return (
    <div className="py-4 border-b border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-900">Table {order.tableNumber || 'N/A'}</span>
          <Badge 
            className={`
              ${order.status === 'READY' ? 'bg-green-500' : 
                order.status === 'COOKING' ? 'bg-yellow-500' : 
                order.status === 'NEW' ? 'bg-blue-500' : 'bg-gray-500'} 
              text-white font-normal
            `}
          >
            {order.status}
          </Badge>
        </div>
        <span className="text-sm text-gray-500">{order.commandDate}</span>
      </div>
      
      <div className="space-y-2">
        {order.commandArticles.map((item) => (
          <div key={item.article.id} className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-gray-900">
                  {item.quantity}x {item.article.title}
                </span>
                {item.isUrgent && (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
              </div>
              {item.specialInstructions && (
                <div className="text-sm text-gray-500 mt-0.5">
                  Note: {item.specialInstructions}
                </div>
              )}
            </div>
            <span className="text-gray-900">${item.article.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
        <span className="font-medium text-gray-900">Total</span>
        <span className="font-medium text-gray-900">${order.totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

const ActiveOrders = () => {
  const [orders, setOrders] = useState<CommandRecieved[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Use Axios response structure 
        const response = await commandService.getActiveCommandsByUserId(user.identifier);
        
        const data: CommandRecieved[] = response.data.filter(
          (order: CommandRecieved) => order.status !== 'COMPLETED'
        );
        
        // Debug logging
        console.log('Fetched Orders:', data);
        
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);

  const onCommand = useCallback((newCommand: CommandRecieved) => {
    setOrders((prevOrders) => {
      if (newCommand.status === 'COMPLETED') {
        return prevOrders.filter((order) => order.id !== newCommand.id);
      }
      const exists = prevOrders.some((order) => order.id === newCommand.id);
      return exists
        ? prevOrders.map((order) =>
            order.id === newCommand.id ? newCommand : order
          ) 
        : [...prevOrders, newCommand]; 
    });
  }, []);

  // Initialize WebSocket for real-time updates
  useWebSocket({
    onCommand,
  }); 

  // Add error and loading states
  if (loading) {
    return (
      <div className="p-4 text-gray-500 flex justify-center items-center h-screen">
        Loading orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 flex justify-center items-center h-screen">
        Error: {error}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-4 text-gray-500 flex justify-center items-center h-screen">
        No active orders
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-full">
          <header className="sticky top-0 z-10 bg-white border-b">
            <div className="flex items-center h-16 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mx-4 h-4" />
              <h1 className="text-lg font-semibold">Active Orders</h1>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-4 py-4 gap-6 flex flex-col">
              {orders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ActiveOrders;