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
