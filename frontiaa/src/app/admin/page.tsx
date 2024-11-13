import { FC } from "react";
import { Sidebar } from "@/components/ui/sidebar";

const Home: FC = () => {
  return (
    <div className="flex flex-row h-screen w-screen bg-[#f3f3eb] items-center">
        <Sidebar/>
    </div>
  );
};

export default Home;
