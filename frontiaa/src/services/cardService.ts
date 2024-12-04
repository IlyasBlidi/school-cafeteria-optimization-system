// src/services/userService.ts

import api from "@/api/axios";
import { Card, CardBody, User } from "@/api/types";
import { API_ENDPOINTS } from "@/lib/constants";

export const cardService = {
  getAllCard: () => api.get<Card[]>(API_ENDPOINTS.CARDS.ALL),

  getCardByUserId: (userId: string) =>
    api.get<CardBody>(API_ENDPOINTS.CARDS.BY_USER_ID(userId)),

  chargeCard: (cardId: string, amount: number) =>
    api.patch<Card>(
      API_ENDPOINTS.CARDS.CAHRGE(cardId, amount),
      amount // Send the amount in the body of the request
    ),
};
