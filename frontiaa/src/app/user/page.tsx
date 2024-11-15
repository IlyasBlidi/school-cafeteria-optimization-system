"use client";
import { Sidebar } from "@/components/ui/sidebar";
import { useState } from "react";
import { Category, menuCategories } from "./utils/menuCategories";

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
    <div className="p-4">
      <div className="w-full grid grid-cols-4 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center gap-3 p-3 rounded-lg border border-gray-200 transition-all
              ${
                activeCategory === category.id
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
          >
            <div className="text-2xl">{category.icon}</div>
            <div className="text-left">
              <div className="text-sm font-medium">{category.label}</div>
              <div
                className={`text-xs ${
                  activeCategory === category.id
                    ? "text-blue-100"
                    : "text-gray-500"
                }`}
              >
                {category.count}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// mital bilma! - [imken hadchi tkharbi9 tayssaybu drari diagrams onchufu!]
const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("lunch");

  return (
    <div className="flex flex-row h-screen w-full bg-[#f2f2f2] font-general-sans">
      <Sidebar />
      <div className="flex flex-col w-full">
        <MenuCategories
          categories={menuCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>
    </div>
  );
};

export default MenuPage;
