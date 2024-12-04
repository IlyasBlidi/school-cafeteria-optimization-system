import { List } from "postcss/lib/list";
import { Role } from "./enums";

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
  role: Role
}

export interface AuthResponse {
  identifier: string; // UUID in Java is represented as a string in TS
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  token: string;
}


export interface CommandSent{
  userId : string ; 
  OrderedDishes : OrderedDish[] ;
  
  

}
export interface CommandRecieved {
  id: string; // UUID represented as a string
  totalPrice: number; // Assuming BigDecimal is converted to a number
  commandDate: string; // LocalDate in ISO 8601 format as a string (e.g., '2024-12-03')
  status: Status; // Enum or string for the status
  commandArticles: OrderedDish[]; // List of associated ArticleCommands
  user: User; // Associated user object
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
  article: Dish;
  
  quantity: number;
}


// Define the types for our order and dish
export interface Dish {
  id: string;
  title: string;
  description: string;
  price: number;
  preparationTime: string;
  calories: number;
  allergens: string[];
  available: boolean;
  category: string;
  dietaryInfo: string[];
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
  isUrgent?: boolean;
}