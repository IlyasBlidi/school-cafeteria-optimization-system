"use client";
import {
  Coffee,
  UtensilsCrossed,
  Cookie,
  Wine,
  Soup,
  Pizza,
  GlassWater,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { AppSidebar } from "@/components/userSidebar/appSidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { DishCard } from "@/components/ui/dishCard";

// hna kan mappiw category l icon
const categoryIcons: { [key: string]: string } = {
  Breakfast: "🍳",
  Lunch: "🍱",
  Dinner: "🍽️",
  Soup: "🥣",
  Desserts: "🍨",
  "Side Dishes": "🥗",
  Appetizer: "🥟",
  Beverages: "☕",
  Snacks: "🥨",
  "VIP Menu": "👑",
};

interface Category {
  id: string;
  name: string;
  description: string;
}

interface Article {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
}

interface MenuCategoriesProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

const MenuCategories: React.FC<MenuCategoriesProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/categories/"
      );
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-screen-xl mx-auto px-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center p-4 rounded-lg border transition-all
            ${
              activeCategory === category.id
                ? "bg-blue-500 border-blue-600 text-white"
                : "bg-white border-gray-200"
            }`}
        >
          <div className="flex items-center gap-3 w-full">
            <span
              className={`${
                activeCategory === category.id ? "text-white" : "text-gray-500"
              }`}
            >
              {categoryIcons[category.name] || (
                <UtensilsCrossed className="w-6 h-6" />
              )}
            </span>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{category.name}</span>
              <span
                className={`text-xs text-start ${
                  activeCategory === category.id
                    ? "text-blue-100"
                    : "text-gray-500"
                }`}
              >
                {category.description}
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
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (articles.length > 0) {
      const filtered = articles.filter(
        (article) => article.category.id === activeCategory
      );
      setFilteredArticles(filtered);
    }
  }, [activeCategory, articles]);

  async function fetchArticles() {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/articles");
      setArticles(response.data);
      console.log("Articles fetched:", response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
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
              <h1 className="text-lg font-semibold">Menu</h1>
            </div>
            <div className="py-4">
              <MenuCategories
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
          </header>

          <main className="flex-1 p-4">
            {filteredArticles.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {filteredArticles.map((article) => (
                  <DishCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
             <div className="flex items-center justify-center h-full font-general-sans font-medium text-[15px]">
               No Articles available!
             </div>
            )}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MenuPage;
