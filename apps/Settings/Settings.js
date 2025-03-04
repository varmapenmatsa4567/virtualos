
import Window from "@/components/Window";

const Settings = ({fileStructure, setFileStructure, ...props}) => {


  return (
    <Window isFixed={true} isCustomized={true} customSize={{width: 700, height: 700}} {...props} 
    >
      
    </Window>
  )
}

export default Settings;