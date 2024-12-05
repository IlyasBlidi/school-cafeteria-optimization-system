import { Role } from "./enums";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

interface CardUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
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
}

export interface AuthResponse {
  identifier: string; // UUID in Java is represented as a string in TS
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  token: string;
}

export interface CardBody {
  cardId: string;
  balance: number;
  lastUpdateDate: string;
}

export interface Card {
  id: string;
  balance: number;
  lastUpdateDate: string;
  user: CardUser;
}

export interface CardForTable {
  id: string;
  balance: number;
  lastUpdateDate: string;
  userEmail: string;
}
