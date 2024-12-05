import Link from "next/link";
import data from "../adminSidebar/data";
import { user } from "@/lib/utils";
import { cardService } from "@/services/cardService";
import { useEffect, useState } from "react";
import { Card, CardBody } from "@/api/types";
import { DialogDemo } from "../dialogDemo/dialogDemo";
import { useCard } from "@/Contexts/CardContext";

export default function PayoutSection() {
  const { cardData, setCardData } = useCard();

  const fetchCardData = async () => {
    try {
      const { data: cardResponse } = await cardService.getCardByUserId(
        user.identifier
      );
      setCardData(cardResponse);
    } catch (error) {
      console.error("Error fetching user card:", error);
    }
  };

  useEffect(() => {
    if (!cardData) {
      fetchCardData(); // Fetch card data only if it's not already fetched
    }
  }, [cardData]);

  return (
    <main className="flex-1 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-limouni rounded-3xl p-6 text-white">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm opacity-80">Available Balance</p>
              <h2 className="text-3xl font-bold">
                {cardData ? `${cardData.balance.toFixed(2)} DH` : "Loading..."}
              </h2>
              <p className="text-sm mt-1">Card ID: {cardData?.cardId}</p>
            </div>
            <p>Virtual Card</p>
          </div>
          <div className="mt-8 space-y-2">
            <p className="font-mono tracking-wider">
              {user.firstName} {user.lastName}
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="opacity-70">Last Updated</p>
                <p>{cardData?.lastUpdateDate}</p>
              </div>
              <div>
                <p className="opacity-70">Class</p>
                <p>IID</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between mb-3">
            <div>
              <p className="text-sm text-gray-500">Today's Menu</p>
              <p className="text-2xl font-bold">8.50dh</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Monthly Spent</p>
              <p className="text-2xl font-bold">142.60dh</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link
            className="p-4 rounded-xl border text-center hover:bg-gray-50"
            href={
              data.navMain
                .find((nav) => nav.title === "Menu")
                ?.items.find((item) => item.title === "Items")?.url || "#"
            }
          >
            <button>
              <span className="block mb-1">📋</span>
              <span className="text-sm">View Menu</span>
            </button>
          </Link>
          <DialogDemo cardId={cardData?.cardId} />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Recent Transactions</h3>
          <div className="space-y-3">
            {[
              {
                title: "Lunch Menu",
                location: "Main Cafeteria",
                time: "Today, 12:36",
                amount: -8.5,
              },
              {
                title: "Breakfast",
                location: "Coffee Shop",
                time: "Today, 08:30",
                amount: -4.2,
              },
              {
                title: "Balance Added",
                location: "Online Top-up",
                time: "Yesterday",
                amount: 50,
              },
            ].map((tx, i) => (
              <div key={i} className="flex justify-between py-3 border-b">
                <div>
                  <p className="font-medium">{tx.title}</p>
                  <p className="text-sm text-gray-500">
                    {tx.location} • {tx.time}
                  </p>
                </div>
                <p className={tx.amount > 0 ? "text-green-500" : ""}>
                  {tx.amount > 0 ? "+" : ""}
                  {tx.amount}dh
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
