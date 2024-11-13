import { FC } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import CommandStateBar from "@/components/ui/CommandStateBar";

const Home: FC = () => {
  return (
    <div className="flex flex-row h-screen w-screen bg-[#f3f3eb] items-center gap-4">
        <Sidebar/>
        <div className="w-full h-full mt-10 flex flex-col items-start  gap-2 px-2">
          <div className="w-full">
          <CommandStateBar></CommandStateBar>
          </div>
          

        </div>
    </div>
  );
};

export default Home;
