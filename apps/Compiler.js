
import Window from "@/components/Window";

const Compiler = (props) => {


  return (
    <Window {...props} 
    >
      <iframe className="w-full h-full" src="https://techiedelight.com/compiler/"></iframe>
    </Window>
  )
}

export default Compiler