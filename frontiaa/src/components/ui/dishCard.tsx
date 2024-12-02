
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Utensils, AlertCircle } from 'lucide-react';
import { ToastAction } from "@/components/ui/toast";
import { toast, useToast } from "@/hooks/use-toast";

export interface OrderedDish {
  name: string;
  price: number;
  quantity?: number;
}

interface DishCardProps {
  onAddToOrder: (dish: OrderedDish) => void;
}

const DishCard = ({ onAddToOrder }: DishCardProps) => {
  const { toast } = useToast();

  const [quantity, setQuantity] = useState(1); // State for quantity


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
  preparationTime?: string;
  calories?: number;
  allergens?: string[];
  available?: boolean;
  dietaryInfo?: string[];
}

interface DishCardProps {
  article: Article;
}

export const DishCard: React.FC<DishCardProps> = ({ article }) => {
  const defaultPrep = "15-20";
  const defaultAllergens = ["Moroccan dish"];
  const defaultDietary = ["Ask about dietary restrictions"];

  // Update quantity handlers
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev)); // Ensure quantity stays >= 1

  return (
    <Card className="w-72 border hover:shadow-lg transition-shadow duration-200 flex flex-col h-full p-4">
      <div className="flex justify-between items-start mb-2">
        <CardTitle className="text-xl font-bold">{article.title}</CardTitle>
        <Badge variant="secondary" className="bg-blue-50 text-blue-800">
          {article.category.name}
        </Badge>
      </div>

      <CardDescription className="text-sm text-gray-600 mb-4">
        {article.description}
      </CardDescription>

            {/* Quantity Selector */}
            <div className="flex items-center gap-2">
              <Button 
                onClick={decreaseQuantity} 
                className="bg-gray-200 border text-gray-700 hover:bg-gray-300  h-2 w-2">
                -
              </Button>
              <span className="text-lg font-bold">{quantity}</span>
              <Button 
                onClick={increaseQuantity} 
                className="bg-gray-200 border text-gray-700  hover:bg-gray-300  h-2 w-2 ">
                +
              </Button>
            </div>
          </div>
      <div className="flex justify-between items-center mb-6">
        <span className="text-2xl font-bold text-blue-600">
          {article.price.toFixed(2)}dh
        </span>
        <div className="flex items-center gap-1 text-gray-600">
          <Clock className="h-4 w-4" />
          <span className="text-sm">{article.preparationTime || defaultPrep} mins</span>
        </div>
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex flex-wrap gap-1">
          {(article.allergens || defaultAllergens).map((allergen) => (
            <Badge 
              key={allergen} 
              variant="outline" 
              className="text-xs bg-green-50 text-green-700 border-green-200"
            >
              {allergen}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-1">
          {(article.dietaryInfo || defaultDietary).map((info) => (
            <Badge 
              key={info} 
              variant="secondary"
              className="text-xs bg-gray-100 text-gray-600"
            >
              {info}
            </Badge>
          ))}
        </div>
      </div>

      <CardFooter className="flex justify-between">
        {dish.available ? (
          <Button
            onClick={() => {
              onAddToOrder({ ...dish, quantity });
              toast({
                title: `${dish.name} added to order`,
                description: `Quantity: ${quantity}`,
              });
            }}
            className="w-full bg-zrek hover:bg-green-700"
          >
            Add to Order
          </Button>
        ) : (
          <Button disabled className="w-full flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Currently Unavailable
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

