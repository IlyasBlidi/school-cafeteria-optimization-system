'use client'
import { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { OrderedDish } from "@/components/ui/dishCard"; // Define Dish type in DishCard or utils.
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AppSidebar } from "@/components/ui/appSidebar/appSidebar";
import { menuCategories } from "./utils/menuCategories";
import DishCard from "@/components/ui/dishCard";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("lunch");
  const [orderedDishes, setOrderedDishes] = useState<OrderedDish[]>([]);


  const addToOrder = (dish: OrderedDish) => {
    setOrderedDishes((prev) => [...prev, dish]);
  };

  const clearOrder = () => setOrderedDishes([]);

  console.log(orderedDishes)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-full">
          <header className="sticky top-0 z-10 bg-white border-b">
            <div className="flex items-center justify-between h-16 px-4">
              <div className="flex items-center">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mx-4 h-4" />
                <h1 className="text-lg font-semibold">Menu</h1>
              </div>
              <div className="font-general-sans text-byed font-medium text-lg">
                <Sheet>
                  <SheetTrigger className="bg-limouni rounded-lg h-10 px-4">
                    Checkout
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Your Order</SheetTitle>
                      <SheetDescription>
                        Review the dishes you’ve added to your order.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col justify-between h-full py-12">
                      <div className="mt-4  space-y-4 justify-between ">

                        {orderedDishes.length > 0 ? (
                          orderedDishes.map((dish, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between border-b pb-2"
                            >
                              <div className="flex justify-between gap-2">
                                <span className="font-medium">{dish.name} </span>
                                <span className="font-light">* {dish.quantity} </span>
                              </div>
                              <span> ${dish.price.toFixed(2)*dish.quantity}</span>
                            </div>
                          ))
                        ) : (
                          <p>No dishes added to your order yet.</p>
                        )}
                      </div>
                      {orderedDishes.length > 0 && (

                        <div className="mt-4 flex flex-col gap-2 ">

                          <div className="flex justify-between gap-2">
                            <span className="font-medium">Total : </span>
                            <span className="font-medium">  ${orderedDishes.reduce((total, dish) => total + dish.price * dish.quantity, 0).toFixed(2)}
                            </span>


                          </div>
                          <Separator orientation="horizontal" className="mb-2" />



                          <Button
                            variant="destructive"
                            onClick={clearOrder}
                            className="w-full h-10 "
                          >
                            Clear Order
                          </Button>
                          <Button
                            onClick={clearOrder}
                            className="w-full bg-limouni h-10"
                          >
                            Command
                          </Button>
                        </div>
                      )}

                    </div>

                  </SheetContent>
                </Sheet>
              </div>
            </div>
            <div className="py-4">
            </div>
          </header>
          <main className="flex-1 p-4">
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <DishCard
                  key={index}
                  onAddToOrder={addToOrder}
                />
              ))}
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MenuPage;
