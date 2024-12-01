"use client";

import { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/appSidebar/appSidebar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  specialInstructions?: string;
  price: number;
  isUrgent?: boolean;
}

interface Order {
  id: string;
  tableNumber: string;
  items: OrderItem[];
  timestamp: string;
  status: "New" | "Preparing" | "Ready";
  total: number;
}

const OrderRow = ({ order }: { order: Order }) => {
  return (
    <div className="py-4 border-b border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-900">Table {order.tableNumber}</span>
          <Badge className="bg-blue-500 text-white font-normal">{order.status}</Badge>
        </div>
        <span className="text-sm text-gray-500">{order.timestamp}</span>
      </div>
      
      <div className="space-y-2">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-gray-900">
                  {item.quantity}x {item.name}
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
            <span className="text-gray-900">${item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
        <span className="font-medium text-gray-900">Total</span>
        <span className="font-medium text-gray-900">${order.total.toFixed(2)}</span>
      </div>
    </div>
  );
};

const ActiveOrders = () => {
  const [orders] = useState<Order[]>([
    {
      id: "1",
      tableNumber: "12",
      status: "New",
      timestamp: "12:30 PM",
      items: [
        {
          id: "1",
          name: "Spaghetti Carbonara",
          quantity: 2,
          price: 8.99,
          specialInstructions: "Extra cheese",
          isUrgent: true,
        },
        {
          id: "2",
          name: "Garlic Bread",
          quantity: 1,
          price: 3.99,
        },
      ],
      total: 21.97,
    },
  ]);

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

          <main className="flex-1">
            <div className="max-w-4xl mx-auto px-4">
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