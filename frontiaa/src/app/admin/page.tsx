"use client"
import { FC, useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import NewOrder from "@/components/ui/newOrder";
import { Order, OrderStatus } from "@/types/order";

const Home: FC = () => {
  // @Marouane : list ghyr bach ntesti
  const [orders, setOrders] = useState<Order[]>([
    {
      orderNumber: "93875",
      studentName: "Marouane Boufarouj",
      studentClass: "IID",
      total: 13.26,
      timeElapsed: "0:18",
      status: "new",
      items: [
        {
          name: "Chicken Sandwich",
          quantity: 1,
          price: 5.99,
        },
        {
          name: "Orange Juice",
          quantity: 2,
          price: 3.5,
        },
      ],
    },
    {
      orderNumber: "93455",
      studentName: "Mouad Elrahrbi",
      studentClass: "IID",
      total: 13.26,
      timeElapsed: "0:18",
      status: "new",
      items: [
        {
          name: "Chicken Sandwich",
          quantity: 1,
          price: 5.99,
        },
        {
          name: "Orange Juice",
          quantity: 2,
          price: 3.5,
        },
      ],
    },
    {
      orderNumber: "9342",
      studentName: "Ilyas Blidi",
      studentClass: "IID",
      total: 13.26,
      timeElapsed: "0:18",
      status: "new",
      items: [
        {
          name: "Chicken Sandwich",
          quantity: 1,
          price: 5.99,
        },
        {
          name: "Orange Juice",
          quantity: 2,
          price: 3.5,
        },
      ],
    }
  ]);

  const handleStatusChange = (orderNumber: string, newStatus: OrderStatus) => {
    console.log(`Changing status of order ${orderNumber} to ${newStatus}`);
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.orderNumber === orderNumber
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  const handleRemove = (orderNumber: string) => {
    setOrders(prevOrders =>
      prevOrders.filter(order => order.orderNumber !== orderNumber)
    );
  };

  const ordersByStatus = {
    new: orders.filter(order => order.status === "new"),
    cooking: orders.filter(order => order.status === "cooking"),
    ready: orders.filter(order => order.status === "ready"),
    completed: orders.filter(order => order.status === "completed"),
  };

  return (
    <div className="font-general-sans flex flex-row h-screen w-screen bg-[#f2f2f2]">
      <Sidebar />
      <div className="flex-1 h-full w-full overflow-hidden">
        <div className="h-full flex flex-col p-6 gap-[4rem]">
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-4 gap-6">
              {(["new", "cooking", "ready", "completed"] as const).map((status) => (
                <div key={status} className="space-y-4">
                  <h2 className="text-lg font-medium text-gray-600">
                    {status.charAt(0).toUpperCase() + status.slice(1)} ({ordersByStatus[status].length})
                  </h2>
                  {ordersByStatus[status].map(order => (
                    <NewOrder
                      key={order.orderNumber}
                      {...order}
                      onStatusChange={(newStatus) => handleStatusChange(order.orderNumber, newStatus)}
                      onRemove={() => handleRemove(order.orderNumber)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;