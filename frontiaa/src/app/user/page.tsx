"use client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { Category, menuCategories } from "../../lib/menuCategories";
import { AppSidebar } from "@/components/userSidebar/appSidebar";
import { Separator } from "@/components/ui/separator";
import DishCard from "@/components/ui/dishCard";

interface MenuCategoriesProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

const MenuCategories: React.FC<MenuCategoriesProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4 w-full max-w-screen-xl mx-auto px-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center p-4 rounded-lg border transition-all hover:bg-gray-50
            ${
              activeCategory === category.id
                ? "bg-blue-500 border-blue-600 text-white"
                : "bg-white border-gray-200"
            }`}
        >
          <div className="flex items-center gap-3 w-full">
            <span className="text-2xl">{category.icon}</span>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{category.label}</span>
              <span
                className={`text-xs ${
                  activeCategory === category.id
                    ? "text-blue-100"
                    : "text-gray-500"
                }`}
              >
                {category.count} Menu In Stock
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("lunch");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-full">
          <header className="sticky top-0 z-10 bg-white border-b">
            <div className="flex items-center h-16 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mx-4 h-4" />
              <h1 className="text-lg font-semibold">Menu</h1>
            </div>
            <div className="py-4">
              <MenuCategories
                categories={menuCategories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
          </header>
          
          <main className="flex-1 p-4">
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              <DishCard />
              <DishCard />
              <DishCard />
              <DishCard />
              <DishCard />

            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MenuPage;