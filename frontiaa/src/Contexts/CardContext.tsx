import { createContext, useContext, useState, ReactNode } from "react";
import { CardBody } from "@/api/types";

type CardContextType = {
  cardData: CardBody | null;
  setCardData: (data: CardBody | null) => void;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [cardData, setCardData] = useState<CardBody | null>(null);

  return (
    <CardContext.Provider value={{ cardData, setCardData }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCard must be used within a CardProvider");
  }
  return context;
};
