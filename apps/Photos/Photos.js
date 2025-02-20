import Window from "@/components/Window";
import { useRef, useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";

const Photos = ({ fileStructure, setFileStructure, ...props }) => {
  const gridRef = useRef(null);
  const cols = ["grid-cols-3", "grid-cols-5", "grid-cols-7", "grid-cols-9"]; // Allowed odd column values
  const [colIndex, setColIndex] = useState(1); // Start at index 1 (cols = 5)
  const [selectedItem, setSelectedItem] = useState(0);

  const increaseCols = () => {
    if (colIndex === cols.length - 1) return;
    setColIndex((prevIndex) => prevIndex + 1);
  };

  const decreaseCols = () => {
    if (colIndex === 0) return;
    setColIndex((prevIndex) => prevIndex - 1);
  };

  // Handle arrow key navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      const totalItems = 100; // Total number of items in the grid
      const colsCount = parseInt(cols[colIndex].split("-")[2]); // Get the current number of columns

      switch (event.key) {
        case "ArrowRight":
          setSelectedItem((prev) => (prev + 1) % totalItems);
          break;
        case "ArrowLeft":
          setSelectedItem((prev) => (prev - 1 + totalItems) % totalItems);
          break;
        case "ArrowDown":
          setSelectedItem((prev) => (prev + colsCount) % totalItems);
          break;
        case "ArrowUp":
          setSelectedItem((prev) => (prev - colsCount + totalItems) % totalItems);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [colIndex]); // Re-run effect when colIndex changes

  return (
    <Window
      {...props}
      toolbar={
        <div className="flex gap-2 text-white py-2 px-2">
          <Minus onClick={increaseCols} className="w-6 h-6 cursor-pointer p-1" />
          <Plus onClick={decreaseCols} className="w-6 h-6 cursor-pointer p-1" />
        </div>
      }
    >
      <div ref={gridRef} className="w-full h-full">
        {/* Make the grid container scrollable */}
        <div className={`grid ${cols[colIndex]} gap-[2px] overflow-y-auto h-full pb-20`}>
          {[...Array(100)].map((_, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer ${
                selectedItem === index ? "border-2 border-[#0158d0]" : ""
              }`}
              onClick={() => setSelectedItem(index)}
            >
              <img
                className="h-full w-full object-cover"
                src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg"
                alt="Preview"
              />
            </div>
          ))}
          <div>
            <p>100 photos</p>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default Photos;