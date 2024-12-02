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

  // In a real app, these would come from props or API
  const dish = {
    name: "Spaghetti Carbonara",
    description: "Classic Italian pasta with creamy egg sauce, crispy pancetta, and pecorino cheese",
    price: 8.99,
    preparationTime: "15-20",
    calories: 850,
    allergens: ["eggs", "dairy", "wheat"],
    available: true,
    category: "Lunch",
    dietaryInfo: ["contains-gluten", "contains-pork"],
  };

  // Update quantity handlers
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev)); // Ensure quantity stays >= 1

  return (
    <Card className="w-72 border">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{dish.name}</CardTitle>
            <CardDescription className="text-sm mt-1">{dish.description}</CardDescription>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {dish.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Price and Preparation Time */}
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-zrek">
              ${dish.price.toFixed(2)}
            </span>
            <div className="flex items-center gap-1 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{dish.preparationTime} mins</span>
            </div>
          </div>

          {/* Nutritional Info */}
          <div className="flex items-center gap-2 justify-between text-gray-600">
            <div className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              <span className="text-sm">{dish.calories} kcal</span>
            </div>

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

          {/* Allergens */}
          <div className="flex flex-wrap gap-2">
            {dish.allergens.map((allergen) => (
              <Badge key={allergen} variant="outline" className="text-xs">
                {allergen}
              </Badge>
            ))}
          </div>

          {/* Dietary Information */}
          <div className="flex flex-wrap gap-2">
            {dish.dietaryInfo.map((info) => (
              <Badge
                key={info}
                variant="secondary"
                className="bg-gray-100 text-gray-800 text-xs"
              >
                {info}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

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

export default DishCard;
