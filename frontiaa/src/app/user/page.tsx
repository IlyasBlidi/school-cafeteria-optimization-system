'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { AppSidebar } from "@/components/userSidebar/appSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { DishCard, OrderedDish } from "@/components/ui/dishCard";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed } from "lucide-react";

// Category Icons mapping
const categoryIcons: { [key: string]: string } = {
  "Breakfast": "🍳",
  "Lunch": "🍱",
  "Dinner": "🍽️",
  "Soup": "🥣",
  "Desserts": "🍨",
  "Side Dishes": "🥗",
  "Appetizer": "🥟",
  "Beverages": "☕",
  "Snacks": "🥨",
  "VIP Menu": "👑"
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
  const [orderedDishes, setOrderedDishes] = useState<OrderedDish[]>([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (articles.length > 0) {
      const filtered = articles.filter(article => article.category.id === activeCategory);
      setFilteredArticles(filtered);
    }
  }, [activeCategory]);

  async function fetchArticles() {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/articles");
      setArticles(response.data);
      setFilteredArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  }

  const handleAddToOrder = (dish: OrderedDish) => {
    setOrderedDishes(prev => {
      const existingDish = prev.find(d => d.article.id === dish.article.id);
      if (existingDish) {
        return prev.map(d => 
          d.article.id === dish.article.id 
            ? { ...d, quantity: d.quantity + dish.quantity }
            : d
        );
      }
      return [...prev, dish];
    });
  };

  const clearOrder = () => {
    setOrderedDishes([]);
  };

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
              <Sheet>
                <SheetTrigger className="bg-limouni rounded-lg h-10 px-4 text-white">
                  Checkout ({orderedDishes.length})
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Your Order</SheetTitle>
                    <SheetDescription>
                      Review your order before confirming
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col justify-between h-full py-12">
                    <div className="mt-4 space-y-4">
                      {orderedDishes.length > 0 ? (
                        orderedDishes.map((dish, index) => (
                          <div key={index} className="flex items-center justify-between border-b pb-2">
                            <div className="flex justify-between gap-2">
                              <span className="font-medium">{dish.article.title}</span>
                              <span className="font-light">× {dish.quantity}</span>
                            </div>
                            <span>{(dish.article.price * dish.quantity).toFixed(2)}dh</span>
                          </div>
                        ))
                      ) : (
                        <p>Your cart is empty</p>
                      )}
                    </div>
                    {orderedDishes.length > 0 && (
                      <div className="mt-4 space-y-4">
                        <div className="flex justify-between font-medium">
                          <span>Total:</span>
                          <span>
                            {orderedDishes.reduce((total, dish) => 
                              total + (dish.article.price * dish.quantity), 0
                            ).toFixed(2)}dh
                          </span>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <Button
                            variant="destructive"
                            onClick={clearOrder}
                            className="w-full"
                          >
                            Clear Order
                          </Button>
                          <Button
                            className="w-full bg-limouni hover:bg-limouni/90"
                          >
                            Confirm Order
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="py-4">
              <MenuCategories
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
          </header>
          
          <main className="flex-1 p-4">
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {filteredArticles.map(article => (
                <DishCard
                  key={article.id}
                  article={article}
                  onAddToOrder={handleAddToOrder}
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