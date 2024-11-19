"use client";
import {
  BringToFront,
  ChartLine,
  CookingPot,
  LogOut,
  Route,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col justify-between gap-4 h-full w-[18rem] p-5 font-medium bg-[#1d1d1f] text-[#f3f3eb]">
      <div className="font-medium flex flex-col gap-8 text-[45px] px-6 h-[30%]">
        <span>Mexicano</span>

        <div className="">
        <div className="text-sm font-light">{formatDate(dateTime)}</div>
        <div className="text-2xl font-medium  ">
          {formatTime(dateTime)}
        </div>
      </div>
      </div>
      <div className="flex flex-col justify-center gap-2 h-[60%] ">
          <div className="flex px-6 py-4 bg-[#f3f3eb] text-[#1d1d1f] rounded-lg w-full gap-3">
            <BringToFront />
            <div>Orders</div>
          </div>
          <div className="flex px-6 py-4 rounded-lg w-full gap-3 ">
            <CookingPot />
            <div>Menu</div>
          </div>
         
          <div className="flex px-6 py-4 rounded-lg w-full gap-3">
            <ChartLine />
            <div>Stats</div>
          </div>
          <div className="flex px-6 py-4 rounded-lg w-full gap-3">
            <Settings />
            <div>Settings</div>
          </div>
        </div>
      
      <div className="flex flex-col h-[10%] ">
        
        <div className="flex flex-col px-6 gap-5">
          <div className="flex flex-row gap-3 items-center">
            <div className="rounded-full w-6 h-6 bg-gray-200"></div>
            <div>Profile</div>
          </div>
          <div className="flex flex-row gap-3">
            <LogOut />
            <div>Exit</div>
          </div>
        </div>
      </div>
    </div>
  );
};
