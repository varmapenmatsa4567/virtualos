
import Window from "@/components/Window";

const Safari = ({...props}) => {


  return (
    <Window {...props} 
    >
      <div className="w-full h-full flex items-center justify-center">
        <iframe className="w-full h-full" src="https://chatgpt.com/"></iframe>
      </div>
    </Window>
  )
}

export default Safari