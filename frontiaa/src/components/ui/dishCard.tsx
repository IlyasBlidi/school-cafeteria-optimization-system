'use client';

import React, { useState } from 'react';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { DishCardProps } from '@/types/types';

export const DishCard: React.FC<DishCardProps> = ({ article, onAddToOrder }) => {
  const defaultPrep = "15-20";
  const defaultAllergens = ["Moroccan dish"];
  const defaultDietary = ["Ask about dietary restrictions"];
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleAddToOrder = () => {
    onAddToOrder({ article, quantity });
    toast(article.title, {
      title: `added to order`,
      description: `Quantity: ${quantity}`,
    });
  };

  return (
    <Card className="w-full border hover:shadow-lg transition-shadow duration-200 p-4">
      <div className="flex justify-between items-start gap-2 mb-2">
        <div className="flex-1">
          <CardTitle className="text-lg mb-1">{article.title}</CardTitle>
          <Badge variant="secondary" className="bg-orange-50 text-orange-800 text-xs">
            {article.category.name}
          </Badge>
        </div>
      </div>
      <CardDescription className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
        {article.description}
      </CardDescription>
      <div className="flex justify-between items-center mb-3">
        <span className="text-xl font-medium text-limouni">
          {article.price.toFixed(2)}dh
        </span>
        <div className="flex items-center gap-1 text-gray-600">
          <Clock className="h-4 w-4" />
          <span className="text-sm">{article.preparationTime || defaultPrep} mins</span>
        </div>
      </div>
      <div className="space-y-3">
        <div className="space-y-1.5">
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
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-md">
            <Button 
              onClick={decreaseQuantity} 
              variant="ghost"
              size="sm"
              className="h-8 px-2"
            >
              -
            </Button>
            <span className="text-sm w-8 text-center">{quantity}</span>
            <Button 
              onClick={increaseQuantity} 
              variant="ghost"
              size="sm"
              className="h-8 px-2"
            >
              +
            </Button>
          </div>
          <Button 
            className="flex-1 bg-limouni hover:bg-gray-800 text-white transition-colors"
            onClick={handleAddToOrder}
          >
            Add to Order
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DishCard;