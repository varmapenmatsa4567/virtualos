import Window from "@/components/Window";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, Minus, Plus } from "lucide-react";

const Photos = ({ fileStructure, setFileStructure, ...props }) => {
  const gridRef = useRef(null);
  const cols = ["grid-cols-3", "grid-cols-5", "grid-cols-7", "grid-cols-9"]; // Allowed odd column values
  const [colIndex, setColIndex] = useState(1); // Start at index 1 (cols = 5)
  const [selectedItem, setSelectedItem] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [db, setDb] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null); // State for full-screen image

  // Open or create IndexedDB database
  useEffect(() => {
    console.log("Opening IndexedDB...");
    const request = indexedDB.open("PhotoboothDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("photos")) {
        db.createObjectStore("photos", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      setDb(db);
      getPhotos(db); // Fetch photos after database is opened
    };

    request.onerror = (event) => {
      console.error("Error opening IndexedDB:", event.target.error);
    };
  }, []);

  // Fetch photos from IndexedDB
  const getPhotos = (db) => {
    if (!db) return;

    const transaction = db.transaction("photos", "readonly");
    const store = transaction.objectStore("photos");
    const request = store.getAll();

    request.onsuccess = (event) => {
      const photos = event.target.result;
      setPhotos(photos);
      console.log("Retrieved photos:", photos);
    };

    request.onerror = (event) => {
      console.error("Error retrieving photos:", event.target.error);
    };
  };

  // Handle image upload from system
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;

      // Store the uploaded image in IndexedDB
      if (db) {
        const transaction = db.transaction("photos", "readwrite");
        const store = transaction.objectStore("photos");
        const request = store.add({ imageUrl, timestamp: new Date() });

        request.onsuccess = () => {
          console.log("Uploaded image saved to IndexedDB");
          getPhotos(db); // Refresh the photo list
        };

        request.onerror = (event) => {
          console.error("Error saving uploaded image to IndexedDB:", event.target.error);
        };
      }
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  };

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
      const totalItems = photos.length;
      console.log("Total items:", totalItems);
      if (totalItems === 0) return; // No photos to navigate
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
        case " ": // Space key
          event.preventDefault(); // Prevent scrolling
          setFullScreenImage(photos[selectedItem].imageUrl); // Open selected image in full-screen
          break;
        case "Escape":
          setFullScreenImage(null); // Close full-screen mode on Escape key
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [colIndex, photos.length, selectedItem, photos]); // Re-run effect when dependencies change

  // Handle double-click to show full-screen image
  const handleDoubleClick = (index) => {
    setFullScreenImage(photos[index].imageUrl);
  };

  // Close full-screen image
  const closeFullScreen = () => {
    setFullScreenImage(null);
  };

  return (
    <Window
      {...props}
      toolbar={
        <div className="flex gap-2 text-white py-2 px-2">
          <Minus onClick={increaseCols} className="w-6 h-6 cursor-pointer p-1" />
          <Plus onClick={decreaseCols} className="w-6 h-6 cursor-pointer p-1" />
          {fullScreenImage && <ChevronLeft onClick={closeFullScreen} className="w-6 h-6 cursor-pointer p-1" />}
          {/* Add a file input for image upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="upload-input"
          />
          <label
            htmlFor="upload-input"
            className="w-6 h-6 cursor-pointer p-1 bg-white text-black flex items-center justify-center rounded"
          >
            📁
          </label>
        </div>
      }
    >
      <div ref={gridRef} className="w-full relative h-full flex flex-col">
        {/* Make the grid container scrollable */}
        <div className={`grid ${cols[colIndex]} gap-[2px] overflow-y-auto pb-20`}>
          {photos.length > 0 &&
            photos.map((photo, index) => (
              <div
                key={index}
                className={`cursor-pointer aspect-square ${
                  selectedItem === index ? "border-[3px] border-[#0158d0]" : ""
                }`}
                onClick={() => setSelectedItem(index)}
                onDoubleClick={() => handleDoubleClick(index)} // Handle double-click
              >
                <img
                  className="w-full h-full object-cover"
                  src={photo.imageUrl}
                  alt="Preview"
                />
              </div>
            ))}
        </div>

        {/* Full-screen image overlay */}
        {fullScreenImage && (
          <div
            className="absolute inset-0 bg-black flex items-center justify-center z-50"
            onClick={closeFullScreen} // Close on click outside the image
          >
            <img
              className="w-full h-full object-contain"
              src={fullScreenImage}
              alt="Full-screen"
            />
          </div>
        )}
      </div>
    </Window>
  );
};

export default Photos;