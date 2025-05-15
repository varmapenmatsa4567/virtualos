import Window from "@/components/Window";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import PhotoContextMenu from "@/components/context-menu/PhotoContextMenu";
import SidebarItem from "./SidebarItem";
import { BsImages, BsPersonSquare } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { LuGalleryVerticalEnd, LuVideo } from "react-icons/lu";
import { BiScreenshot } from "react-icons/bi";
import useGlobalStore from "@/stores/global-store";

const Photos = ({ fileStructure, setFileStructure, db, ...props }) => {
  const gridRef = useRef(null);
  const cols = ["grid-cols-3", "grid-cols-5", "grid-cols-7", "grid-cols-9"];
  const [colIndex, setColIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [photos, setPhotos] = useState([]);
  const [displayPhotos, setDisplayPhotos] = useState([]);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedPhotoAction, setSelectedPhotoAction] = useState(0);
  const {dbChange, setDbChange} = useGlobalStore();

  const photosFilters = [
      { id: 0, text: "Library", icon: BsImages },
      { id: 1, text: "Favourites", icon: FaRegHeart },
      { id: 2, text: "Recently Uploaded", icon: FiUpload },
      { id: 3, text: "Recently Deleted", icon: FaRegTrashCan },
  ];

  const collectionFilters = [
      { id: 4, text: "Days", icon: IoTimeOutline },
      { id: 5, text: "Media Types", icon: LuGalleryVerticalEnd, isMenu: true },
      { id: 6, text: "Albums  ", icon: LuGalleryVerticalEnd, isMenu: true },
  ]

  const subFilters = {
    5: [
      { id: 7, text: "Videos", icon: LuVideo },
      { id: 8, text: "Selfies", icon: BsPersonSquare },
      { id: 9, text: "Live Photos", icon: BsImages },
      { id: 10, text: "Screenshots", icon: BiScreenshot },
    ],
    6: [
      { id: 11, text: "Videos", icon: BsImages },
    ]
  }

  // Open or create IndexedDB database
  useEffect(() => {
    if(db){
      getPhotos(db);
      return;
    }
  }, [db, dbChange]);

  // Filter Photos
  useEffect(() => {
    switch (selectedPhotoAction) {
      case 0:
        setDisplayPhotos(photos);
        break;
      case 1:
        setDisplayPhotos(photos.filter((photo) => photo.isFavourite));
        break;
      case 2:
        setDisplayPhotos(photos.filter((photo) => photo.isUpload));
        break;
      case 7:
        setDisplayPhotos(photos.filter((photo) => photo.isVideo));
        break;
      case 8:
        setDisplayPhotos(photos.filter((photo) => photo.isCamera));
        break;
      case 10:
        setDisplayPhotos(photos.filter((photo) => photo.isScreenshot));
        break;
      default:
        setDisplayPhotos(photos);
        break;
    }
  }, [selectedPhotoAction, photos])

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
        let isVideo = false;
        if(file.type.includes("video")){
          isVideo = true;
          console.log(imageUrl);
        }
        const request = store.add({ imageUrl, timestamp: new Date(), isUpload: true, isVideo: isVideo });

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

  const deleteSelectedPhotos = () => {
    if (!db || selectedItems.size === 0) return;
    
    const transaction = db.transaction("photos", "readwrite");
    const store = transaction.objectStore("photos");
    
    // Get the actual IDs of the selected items
    const selectedIds = Array.from(selectedItems).map(index => photos[index].id);
    
    selectedIds.forEach(id => {
      const request = store.delete(id);
      request.onerror = (e) => console.error("Delete failed", e.target.error);
    });

    transaction.oncomplete = () => {
      console.log("All selected photos deleted");
      setSelectedItems(new Set());
      getPhotos(db);
    };
  };

  const deletePhoto = (id) => {  // Typically you'll want to use the record's ID, not index
    if (!db) return;
    
    const transaction = db.transaction("photos", "readwrite");
    const store = transaction.objectStore("photos");
    const request = store.delete(id);  // Delete by the record's key

    request.onsuccess = () => {
        console.log("Photo deleted successfully");
        getPhotos(db);  // Refresh the photo list
    };

    request.onerror = (event) => {
        console.error("Error deleting photo:", event.target.error);
    };
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

    if (event.metaKey || event.ctrlKey) {
      // Handle Cmd/Ctrl+Arrow key combinations for multi-selection
      let newIndex;
      switch (event.key) {
        case "ArrowRight":
          newIndex = Array.from(selectedItems).pop() + 1;
          if (newIndex >= totalItems) newIndex = totalItems - 1;
          setSelectedItems(prev => new Set(prev).add(newIndex));
          break;
        case "ArrowLeft":
          newIndex = Array.from(selectedItems).pop() - 1;
          if (newIndex < 0) newIndex = 0;
          setSelectedItems(prev => new Set(prev).add(newIndex));
          break;
        case "ArrowDown":
          newIndex = Array.from(selectedItems).pop() + colsCount;
          if (newIndex >= totalItems) newIndex = totalItems - 1;
          setSelectedItems(prev => new Set(prev).add(newIndex));
          break;
        case "ArrowUp":
          newIndex = Array.from(selectedItems).pop() - colsCount;
          if (newIndex < 0) newIndex = 0;
          setSelectedItems(prev => new Set(prev).add(newIndex));
          break;
      }
    } else {
      // Original single-selection behavior
      switch (event.key) {
        case "ArrowRight":
          setSelectedItems(new Set([(Array.from(selectedItems).pop() + 1) % totalItems]));
          break;
        case "ArrowLeft":
          setSelectedItems(new Set([(Array.from(selectedItems).pop() - 1 + totalItems) % totalItems]));
          break;
        case "ArrowDown":
          setSelectedItems(new Set([(Array.from(selectedItems).pop() + colsCount) % totalItems]));
          break;
        case "ArrowUp":
          setSelectedItems(new Set([(Array.from(selectedItems).pop() - colsCount + totalItems) % totalItems]));
          break;
        case " ":
          event.preventDefault();
          if (selectedItems.size > 0) {
            setFullScreenImage(displayPhotos[Array.from(selectedItems).pop()]);
          }
          break;
        case "Escape":
          setFullScreenImage(null);
          setSelectedItems(new Set());
          break;
        default:
          break;
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [colIndex, displayPhotos.length, displayPhotos, selectedItems]);

  // Handle double-click to show full-screen image
  const handleDoubleClick = (index) => {
    setFullScreenImage(displayPhotos[index]);
  };

  // Close full-screen image
  const closeFullScreen = () => {
    setFullScreenImage(null);
  };

  // Update Photo
  const updatePhoto = (id, updatedData) => {
    if (!db) return;

    const transaction = db.transaction("photos", "readwrite");
    const store = transaction.objectStore("photos");
    
    // First get the existing photo
    const getRequest = store.get(id);

    getRequest.onsuccess = (event) => {
      const existingPhoto = event.target.result;
      if (!existingPhoto) {
        console.error("Photo not found");
        return;
      }

      // Merge existing data with updates
      const updatedPhoto = { ...existingPhoto, ...updatedData };
      
      // Update the record
      const updateRequest = store.put(updatedPhoto);

      updateRequest.onsuccess = () => {
        console.log("Photo updated successfully");
        getPhotos(db); // Refresh the photo list
      };

      updateRequest.onerror = (event) => {
        console.error("Error updating photo:", event.target.error);
      };
    };

    getRequest.onerror = (event) => {
      console.error("Error finding photo to update:", event.target.error);
    };
  };

  const addToFavs = (e, id, photo) => {
    e.stopPropagation();
    photo.isFavourite = true;
    updatePhoto(id, photo);
  }

  const removeFromFavs = (e, id, photo) => {
    e.stopPropagation();
    photo.isFavourite = false;
    updatePhoto(id, photo);
  }

  const rotatePhoto = (id, photo) => {
    if(photo.rotate != null){
      photo.rotate = photo.rotate + 90;
      if(photo.rotate == 360) photo.rotate = 0;
    } 
    else {
      photo.rotate = 90;
    }
    updatePhoto(id, photo);
  }

  // Select photo
  const selectPhoto = (e, index) => {
    if (e.nativeEvent.metaKey || e.nativeEvent.ctrlKey) {
      // Cmd/Ctrl+Click - toggle selection
      setSelectedItems(prev => {
        const newSelection = new Set(prev);
        if (newSelection.has(index)) {
          newSelection.delete(index);
        } else {
          newSelection.add(index);
        }
        return newSelection;
      });
    } else {
      // Regular click - clear selection and select this one
      setSelectedItems(new Set([index]));
    }
  };

  return (
    <Window
      {...props}
      toolbar={
        <div className="flex gap-2 text-white px-2">
          <Minus onClick={increaseCols} className="w-6 h-6 cursor-pointer p-1" />
          <Plus onClick={decreaseCols} className="w-6 h-6 cursor-pointer p-1" />
          {fullScreenImage && <ChevronLeft onClick={closeFullScreen} className="w-6 h-6 cursor-pointer p-1" />}
          <input
            type="file"
            accept="image/*,video/*"
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
      <div className="w-full h-full flex gap-1">  
        <div className="bg-[#2d2d2d] border-r-2 w-64 border-[#575759] p-2 px-3 flex flex-col gap-1">
          <p className="text-[#727174] text-xs font-bold">Photos</p>
          {photosFilters.map((filter) => (
            <SidebarItem
              key={filter.id}
              onClick={() => setSelectedPhotoAction(filter.id)}
              isSelected={selectedPhotoAction === filter.id}
              Icon={
                <filter.icon
                className={`text-[#0093ff]`}
              />
              }
              text={filter.text}
            />
          ))}
          <p className="text-[#727174] text-xs font-bold mt-3">Collections</p>
          {collectionFilters.map((filter) => (
            <div key={filter.id} className="flex flex-col">
                <SidebarItem
                  isMenu={filter.isMenu}
                  onClick={() => setSelectedPhotoAction(filter.id)}
                  isSelected={selectedPhotoAction === filter.id}
                  Icon={
                    <filter.icon
                    className={`text-[#0093ff]`}
                  />
                  }
                  text={filter.text}
                />
                {filter.isMenu && subFilters[filter.id].map((subFilter) => (
                  <SidebarItem
                    key={subFilter.id}
                    isMenu={subFilter.isMenu}
                    isSubItem={true}
                    onClick={() => setSelectedPhotoAction(subFilter.id)}
                    isSelected={selectedPhotoAction === subFilter.id}
                    Icon={
                      <subFilter.icon
                      className={`text-[#888d8d]`}
                    />
                    }
                    text={subFilter.text}
                  />
                ))}
            </div>
          ))}
        </div>
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
            {displayPhotos.length > 0 &&
              displayPhotos.map((photo, index) => (
                <div
                  key={index}
                  className={`cursor-pointer relative group aspect-square ${
                    selectedItems.has(index) ? "border-[3px] border-[#0158d0]" : ""
                  }`}
                  onClick={(e) => selectPhoto(e, index)}
                  onDoubleClick={() => handleDoubleClick(index)}
                >
                  <FaRegHeart 
                    onClick={(e) => addToFavs(e, photo.id, photo)}
                    className="text-white z-10 hidden group-hover:block absolute left-2 bottom-2"
                  />
                  {photo.isFavourite && (
                    <FaHeart
                      onClick={(e) => removeFromFavs(e, photo.id, photo)}
                      className="text-white z-10 absolute left-2 bottom-2"
                    />
                  )}
                  <ContextMenu>
                    <ContextMenuTrigger>
                      <img
                        style={{rotate: `${photo.rotate ? `${photo.rotate}deg` : "0deg"}`}}
                        className={`w-full h-full object-cover`}
                        src={photo.imageUrl}
                        alt="Preview"
                      />
                    </ContextMenuTrigger>
                    <PhotoContextMenu 
                      onDeletePhoto={() => {
                        if (selectedItems.size > 0) {
                          deleteSelectedPhotos();
                        } else {
                          deletePhoto(photo.id);
                        }
                      }}
                      onRotatePhoto={() => rotatePhoto(photo.id, photo)}
                    />
                  </ContextMenu>
                </div>
              ))}
          </div>

          {/* Full-screen image overlay */}
          {fullScreenImage && (
            <div
              className="absolute inset-0 bg-black flex items-center justify-center z-50"
              onClick={closeFullScreen}
            >
              {fullScreenImage.isVideo ? (
                <video autoPlay controls>
                  <source src={fullScreenImage.imageUrl} type="video/mp4" />
                </video>
              ) : (
              <img
                style={{rotate: `${fullScreenImage.rotate ? `${fullScreenImage.rotate}deg` : "0deg"}`}}
                className="w-full h-full object-contain"
                src={fullScreenImage.imageUrl}
                alt="Full-screen"
              />
              )}
            </div>
          )}
        </div>
      </div>
    </Window>
  );
};

export default Photos;