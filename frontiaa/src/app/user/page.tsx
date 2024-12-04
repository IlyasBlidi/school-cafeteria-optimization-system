"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { AppSidebar } from "@/components/userSidebar/appSidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { DishCard } from "@/components/ui/dishCard";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, UtensilsCrossed, X } from "lucide-react";
import { categoryIcons } from "@/lib/utils";
import {
  MenuCategoriesProps,
  Category,
  Article,
  OrderedDish,
} from "@/types/types";

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
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  return (
    <div className="font-general-sans w-full max-w-screen-xl mx-auto px-4 sm:px-7">
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex p-2 sm:p-4 rounded-lg border transition-all hover:shadow-md
              ${
                activeCategory === category.id
                  ? "bg-blue-500 border-blue-600 text-white"
                  : "bg-white border-gray-200 hover:border-blue-200"
              }`}
          >
            <div className="flex gap-3 w-full items-center">
              <div className="flex items-center justify-center w-full sm:w-auto">
                <span
                  className={`inline-flex ${
                    activeCategory === category.id
                      ? "text-white"
                      : "text-blue-500"
                  }`}
                >
                  {categoryIcons[category.name] || (
                    <UtensilsCrossed className="w-5 h-5" />
                  )}
                </span>
              </div>

              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-medium">{category.name}</span>
                <span
                  className={`text-xs mt-0.5 text-start ${
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
      const filtered = articles.filter(
        (article) => article.category.id === activeCategory
      );
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
    setOrderedDishes((prev) => {
      const existingDish = prev.find((d) => d.article.id === dish.article.id);
      if (existingDish) {
        return prev.map((d) =>
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

  const handleDeleteOrder = (articleId: string) => {
    setOrderedDishes((prev) =>
      prev.filter((dish) => dish.article.id !== articleId)
    );
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="font-general-sans flex flex-col h-full">
          <header className="sticky top-0 z-10 bg-white border-b">
            <div className="flex items-center justify-between h-16 px-4">
              <div className="flex items-center">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mx-2 h-4" />
                <h1 className="text-lg font-semibold">Menu</h1>
              </div>
              <Sheet>
                <SheetTrigger className="mr-2">
                  <ShoppingCart />
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md p-0 border-l">
                  <div className="flex flex-col h-full">
                    <div className="relative p-6 rounded-b-3xl">
                      <SheetHeader className="mb-0">
                        <SheetTitle className="text-2xl font-medium bg-clip-text text-black">
                          Your Order
                        </SheetTitle>
                        <SheetDescription className="text-gray-600">
                          Review your order before confirming
                        </SheetDescription>
                      </SheetHeader>
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-1.5 bg-gray-200 rounded-full" />
                    </div>
                    <div className="flex-1 overflow-auto px-6">
                      <div className="py-6 space-y-6">
                        {orderedDishes.length > 0 ? (
                          orderedDishes.map((dish, index) => (
                            <div
                              key={index}
                              className="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                  <span className="font-semibold text-gray-900">
                                    {dish.article.title}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    Quantity: {dish.quantity}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <span className="font-medium text-blue-600">
                                    {(
                                      dish.article.price * dish.quantity
                                    ).toFixed(2)}
                                    dh
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  handleDeleteOrder(dish.article.id)
                                }
                                className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-100 text-red-600 rounded-full p-1.5 hover:bg-red-200"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))
                        ) : (
                          <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="bg-gray-50 rounded-full p-6 mb-4">
                              <ShoppingCart className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500">Your cart is empty</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {orderedDishes.length > 0 && (
                      <div className="border-t bg-gray-50/80 backdrop-blur-sm p-6 rounded-t-3xl">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Amount</span>
                            <span className="text-xl font-medium text-gray-900">
                              {orderedDishes
                                .reduce(
                                  (total, dish) =>
                                    total + dish.article.price * dish.quantity,
                                  0
                                )
                                .toFixed(2)}
                              dh
                            </span>
                          </div>
                          <div className="space-y-2">
                            <button className="w-full h-12 text-base font-medium bg-green-300 text-green-800 rounded-xl">
                              Confirm Order
                            </button>
                            <button
                              onClick={clearOrder}
                              className="w-full h-12 text-base font-medium bg-white border-2 border-gray-200 text-gray-600 rounded-xl"
                            >
                              Clear Order
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </header>

          <main className="flex-1 p-4">
            <div className="py-4">
              <MenuCategories
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {filteredArticles.map((article) => (
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
