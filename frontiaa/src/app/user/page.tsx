'use client'
import { useState } from "react";
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
                  <DishCard key={article.id} article={article} onAddToOrder={addToOrder}/>
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
