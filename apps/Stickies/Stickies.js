
import Window from "@/components/Window";

const Stickies = ({...props}) => {
  return (
    <Window {...props}
    isSepNot={true}
    isTransparent={true}
    toolbarColor={"bg-[#feea3d]"}
    isCustomized={true}
    customSize={{ width: "200", height: "200" }} 
    className="rounded-lg overflow-hidden shadow-xl" 
    >
      <div className="w-full h-full flex items-center justify-center bg-[#fef49c] p-2">
        <textarea className="w-full text-[13px] resize-none h-full outline-none bg-transparent"></textarea>
      </div>
    </Window>
  )
}

export default Stickies;