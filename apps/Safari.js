
import Window from "@/components/Window";
import { BsViewList } from "react-icons/bs";
import { IoRefresh, IoSearch } from "react-icons/io5";

const Safari = ({...props}) => {

  return (
    <Window
    isSepNot={true}
      isTransparent={true}
      toolbarColor={"bg-[#3b3b3c]"}
    {...props} 
    toolbar={
      <div className="flex items-center justify-center gap-2">
        <div className="border border-[#535252] w-5/12 flex items-center px-1 justify-between rounded-lg text-center text-white text-[13px] py-1">
          <BsViewList size={16}/>
          <div className="flex items-center gap-2">
            <IoSearch size={15} className="text-[#9d9d9d]"/>
            <p>google.com</p>
          </div>
          <IoRefresh size={16}/>
        </div>
      </div>
    }
    >
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#3b3b3c]">
        <div className="h-6 flex gap-2 py-2 px-5 text-xs justify-start w-full">
          <p>Google</p>
        </div>
        <iframe className="w-full flex-1" src="https://www.google.com/webhp?igu=1"></iframe>
      </div>
    </Window>
  )
}

export default Safari