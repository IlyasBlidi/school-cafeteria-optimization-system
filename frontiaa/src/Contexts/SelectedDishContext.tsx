import { Dish, OrderItem } from '@/api/types';
import React, { createContext, useState, useContext, ReactNode } from 'react';



interface OrderContextType {
  orderItems: OrderItem[];
  addToOrder: (dish: Dish, specialInstructions?: string) => void;
  removeFromOrder: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const addToOrder = (dish: Dish, specialInstructions?: string) => {
    setOrderItems(currentItems => {
      // Check if the dish is already in the order
      const existingItemIndex = currentItems.findIndex(item => item.id === dish.id);
      
      if (existingItemIndex > -1) {
        // If dish exists, increase quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
          specialInstructions
        };
        return updatedItems;
      }
      
      // If dish is not in order, add it
      return [
        ...currentItems, 
        {
          id: dish.id,
          name: dish.name,
          quantity: 1,
          price: dish.price,
          specialInstructions
        }
      ];
    });
  };

  const removeFromOrder = (dishId: string) => {
    setOrderItems(currentItems => 
      currentItems.filter(item => item.id !== dishId)
    );
  };

  const updateQuantity = (dishId: string, quantity: number) => {
    setOrderItems(currentItems => 
      currentItems.map(item => 
        item.id === dishId 
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const clearOrder = () => {
    setOrderItems([]);
  };

  return (
    <OrderContext.Provider 
      value={{ 
        orderItems, 
        addToOrder, 
        removeFromOrder, 
        updateQuantity,
        clearOrder 
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use the OrderContext
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};