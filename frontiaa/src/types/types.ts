import { Role } from "@/api/enums";

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

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

export interface AuthResponse {
  identifier: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  token: string;
}

export interface CommandSent {
  userId: string;
  OrderedDishes: OrderedDishDTO[];
}

export interface CommandRecieved {
  id: string; 
  totalPrice: number;
  commandDate: string; 
  status: Status; 
  commandArticles: OrderedDish[];
  user: User;
}

export enum Status {
  NEW = "NEW",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
  COOKING = "COOKING",
  READY = "READY",
  COMPLETED = "COMPLETED",
}

export interface OrderedDish {
  article: Article;
  quantity: number;
}

export interface OrderedDishDTO {
  articleId: String;
  quantity: number;
}


export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
  isUrgent?: boolean;
}


export interface NewOrderProps {
  orderNumber: string;
  studentName: string;
  studentClass: string;
  total: number;
  timeElapsed: string;
  status: Status;
  onStatusChange: (newStatus: Status) => void;
  onRemove: () => void;
  items?: OrderedDish[];
}