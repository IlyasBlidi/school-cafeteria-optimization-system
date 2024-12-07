export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface MenuCategoriesProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  preparationTime?: string;
  allergens?: string[];
  available?: boolean;
  dietaryInfo?: string[];
}

export interface OrderedDish {
  article: Article;
  quantity: number;
}

export interface DishCardProps {
  article: Article;
  onAddToOrder: (dish: OrderedDish) => void;
}

export type OrderStatus = "new" | "cooking" | "ready" | "completed";

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  orderNumber: string;
  studentName: string;
  studentClass: string;
  total: number;
  timeElapsed: string;
  status: OrderStatus;
  items: OrderItem[];
}


export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  userName: string;
  timeAgo: string;
  isRead: boolean;
  metadata: Record<string, any>;
  actions: string[];
  target?: string;
}