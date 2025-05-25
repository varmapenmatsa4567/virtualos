
import Window from "@/components/Window";

const Chess = ({...props}) => {


  return (
    <Window {...props} 
    >
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-white text-2xl">Currently Unavailable</p>
      </div>
    </Window>
  )
}

export default Chess;