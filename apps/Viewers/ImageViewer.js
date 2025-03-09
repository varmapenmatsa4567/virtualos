
import Window from "@/components/Window";

const ImageViewer = ({extraProps, ...props}) => {

    const {imageUrl} = extraProps;

  return (
    <Window {...props} 
    >
      <div className="w-full h-full flex items-center justify-center p-1">
        <img src={imageUrl} alt="Image" className="w-full h-full object-contain"  />
      </div>
    </Window>
  )
}

export default ImageViewer