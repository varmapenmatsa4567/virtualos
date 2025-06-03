
import Window from "@/components/Window";
import useFinderStore from "@/stores/finder-store";
import { useState } from "react";

const Terminal = ({...props}) => {

  const {finderItems, setFinderItems} = useFinderStore();
  const [currentFinderItem, setCurrentFinderItem] = useState("macos");

  return (
    <Window {...props} 
      isTransparent={true}
    >
      <div className="w-full tracking-wider h-full flex flex-col bg-[#1d1e1e] text-white text-xs">
        <p className="pl-1">Last login: Mon May 26 21:29:26</p>
        <div className="flex">
          <p>chiranjeevip@Chiranjeevis-MacBook-Air ~ %</p>
          <input type="text" className="outline-none bg-transparent flex-1 pl-1"/>
        </div>
      </div>
    </Window>
  )
}

export default Terminal