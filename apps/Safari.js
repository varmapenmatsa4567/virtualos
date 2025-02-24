
import Window from "@/components/Window";

const Safari = ({fileStructure, setFileStructure, ...props}) => {


  return (
    <Window {...props} 
    >
      <iframe src="https://web.whatsapp.com/" title="Browser" referrerPolicy="no-referrer" sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts" style={{"pointerEvents": "initial"}}></iframe>
    </Window>
  )
}

export default Safari