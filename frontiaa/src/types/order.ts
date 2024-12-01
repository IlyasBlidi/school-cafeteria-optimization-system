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