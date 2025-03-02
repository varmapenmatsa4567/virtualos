
import Window from "@/components/Window";
import { Plus } from "lucide-react";
import { useState } from "react";
import Stopwatch from "./Stopwatch";
import Timer from "./Timer";
import WorldClock from "./WorldClock";

const Clock = ({fileStructure, setFileStructure, ...props}) => {

    const [option, setOption] = useState("World Clock");

    const handleOptionChange = (newOption) => {
        setOption(newOption);
    }

  return (
    <Window {...props} isCustomized={true} customSize={{ width: "600px", height: "550px" }}
        toolbar={
            <div className="flex items-center gap-2 justify-between w-full  ">
                <div className="border-[1.5px] border-[#464244] flex mx-auto rounded-md text-sm text-[#bab6b7]">
                    <p onClick={() => handleOptionChange("World Clock")} className={`${option == "World Clock" && "bg-[#464243] text-white font-medium"} px-3 border-r-[1.5px] border-[#464244] rounded-md`}>World Clock</p>
                    <p onClick={() => handleOptionChange("Alarms")} className={`${option == "Alarms" && "bg-[#464243] text-white font-medium"} px-3 border-r-[1.5px] border-[#464244] rounded-md`}>Alarms</p>
                    <p onClick={() => handleOptionChange("Stopwatch")} className={`${option == "Stopwatch" && "bg-[#464243] text-white font-medium"} px-3 border-r-[1.5px] border-[#464244] rounded-md`}>Stopwatch</p>
                    <p onClick={() => handleOptionChange("Timer")} className={` ${option == "Timer" && "bg-[#464243] text-white font-medium"} px-3 rounded-md`}>Timer</p>
                </div>
                <Plus size={20} className="text-[#bab6b7] mx-3 cursor-pointer"/>
            </div>
        }
    >
        <WorldClock isActive={option == "World Clock"}/>
        {option == "Alarms" && <div className="flex flex-col gap-2 p-4">
            <p className="text-center text-sm text-[#bab6b7]">No alarms added</p>
        </div>}
        <Stopwatch isActive={option == "Stopwatch"}/>
        <Timer isActive={option == "Timer"}/>
    </Window>
  )
}

export default Clock