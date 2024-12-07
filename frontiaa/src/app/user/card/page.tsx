"use client";

import { AppSidebar } from "@/components/userSidebar/appSidebar";
import PayoutSection from "@/components/card/payout";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { CardProvider } from "@/Contexts/CardContext";

const MenuPage = () => {
  return (
    <CardProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col h-full">
            <header className="sticky top-0 z-10 bg-white border-b">
              <div className="flex items-center h-16 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mx-4 h-4" />
                <h1 className="text-lg font-semibold">E-card</h1>
              </div>
            </header>

            <main className="flex-1 p-4">
              <PayoutSection />
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </CardProvider>
  );
};

export default MenuPage;
