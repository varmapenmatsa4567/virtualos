
import Window from "@/components/Window";

const ImageViewer = ({...props}) => {

  return (
    <Window {...props} 
    >
      <img src={imageUrl} alt="Image" style={{ width: '100%', height: '100%' }} />
    </Window>
  )
}

export default ImageViewer