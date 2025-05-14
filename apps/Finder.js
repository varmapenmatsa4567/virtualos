
import ModernWindow from "@/components/ModernWindow";
import Window from "@/components/Window";

const Finder = ({...props}) => {


  return (
    <ModernWindow {...props} 
      isCustomized={true}
      customSize={{width: 700, height: 500}}
      sidebar={
        <div className="flex flex-col text-white text-sm gap-2">
          <p>Applications</p>
          <p>Downloads</p>
          <p>Pictures</p>
          <p>Movies</p>
          <p>Applications</p>
        </div>
      }
    >
      <div className="flex flex-col h-full">
        <div className="h-10 bg-[#3b3639] toolbar">

        </div>
        <div className="flex-1 bg-[#262125] w-full h-full">

        </div>
      </div>
    </ModernWindow>
  )
}

export default Finder