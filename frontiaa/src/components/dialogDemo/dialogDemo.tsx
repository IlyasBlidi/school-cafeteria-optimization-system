import { useState } from "react";
import { cardService } from "@/services/cardService";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCard } from "@/Contexts/CardContext";

export function DialogDemo({ cardId }: { cardId?: string }) {
  const { cardData, setCardData } = useCard();
  const [newAmount, setNewAmount] = useState<number>(0.0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChargeCard = async () => {
    if (newAmount <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    setIsLoading(true);
    try {
      const updatedCard = await cardService.chargeCard(cardId!, newAmount);
      setCardData({ ...cardData!, balance: updatedCard.data.balance }); // Update the balance in the context
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError("Failed to update the card balance. Please try again.");
      console.error("Error charging card:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-4 rounded-xl border text-center hover:bg-gray-50">
          <span className="block mb-1">⚡</span>
          <span className="text-sm">Charge</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Charge your card balance</DialogTitle>
          <DialogDescription>
            Enter the amount to charge your card. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Set Amount
            </Label>
            <Input
              id="amount"
              value={newAmount}
              min="0"
              className="col-span-3"
              onChange={(e) => setNewAmount(Number(e.target.value))}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={handleChargeCard}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save new balance"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
