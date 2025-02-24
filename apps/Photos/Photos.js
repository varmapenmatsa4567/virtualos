import Window from "@/components/Window";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, Minus, Plus } from "lucide-react";

const Photos = ({ fileStructure, setFileStructure, ...props }) => {
  const gridRef = useRef(null);
  const cols = ["grid-cols-3", "grid-cols-5", "grid-cols-7", "grid-cols-9"];
  const [colIndex, setColIndex] = useState(1);
  const [selectedItem, setSelectedItem] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [db, setDb] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

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
      getPhotos(db);
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
  const handleImageUpload = (file) => {
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

  // Handle drag-and-drop events
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      // Process each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/")) {
          handleImageUpload(file);
        } else {
          console.warn("Skipped non-image file:", file.name);
        }
      }
    }
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
      if (totalItems === 0) return;
      const colsCount = parseInt(cols[colIndex].split("-")[2]);

      switch (event.key) {
        case "ArrowRight":
          setSelectedItem((prev) => (prev + 1) % totalItems);
          if(fullScreenImage) setFullScreenImage(photos[selectedItem].imageUrl);
          setFullScreenImage
          break;
        case "ArrowLeft":
          setSelectedItem((prev) => (prev - 1 + totalItems) % totalItems);
          if(fullScreenImage) setFullScreenImage(photos[selectedItem].imageUrl);
          break;
        case "ArrowDown":
          setSelectedItem((prev) => (prev + colsCount) % totalItems);
          if(fullScreenImage) setFullScreenImage(photos[selectedItem].imageUrl);
          break;
        case "ArrowUp":
          setSelectedItem((prev) => (prev - colsCount + totalItems) % totalItems);
          if(fullScreenImage) setFullScreenImage(photos[selectedItem].imageUrl);
          break;
        case " ":
          event.preventDefault();
          setFullScreenImage(photos[selectedItem].imageUrl);
          break;
        case "Escape":
          setFullScreenImage(null);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [colIndex, photos.length, selectedItem, photos]);

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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const files = e.target.files;
              if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                  handleImageUpload(files[i]);
                }
              }
            }}
            className="hidden"
            id="upload-input"
            multiple // Allow multiple file selection
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
      <div
        ref={gridRef}
        className={`w-full relative h-full flex flex-col ${
          isDragging ? "border-2 border-dashed border-blue-500" : ""
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={`grid ${cols[colIndex]} gap-[2px] overflow-y-auto`}>
          {photos.length > 0 &&
            photos.map((photo, index) => (
              <div
                key={index}
                className={`cursor-pointer aspect-square ${
                  selectedItem === index ? "border-[3px] border-[#0158d0]" : ""
                }`}
                onClick={() => setSelectedItem(index)}
                onDoubleClick={() => handleDoubleClick(index)}
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
            onClick={closeFullScreen}
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