import Window from "@/components/Window";
import SidebarItem from "./SidebarItem";
import { useEffect, useState } from "react";
import useFinderStore from "@/stores/finder-store";
import { ChevronLeft, ChevronRight, CircleEllipsis, Tag } from "lucide-react";
import { TbFolderPlus } from "react-icons/tb";
import { IoSearch, IoShareOutline } from "react-icons/io5";
import { FiGrid } from "react-icons/fi";
import Folder from "./Folder";
import { createFolder, deleteItem, getSortedItems, moveItemToTrash, pasteItem } from "@/utils/fs-utils";
import FinderContextMenu from "@/components/context-menu/FinderContextMenu";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import ListViewFolder from "./ListViewFolder";
import { LuChevronsUpDown } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa6";
import { getId } from "@/utils/utils";
import File from "./File";
import ListFile from "./ListFile";

const Finder = ({extraProps, ...props}) => {

  const {favourites, setFavourites, finderItems, setFinderItems} = useFinderStore();
  const [historyIndex, setHistoryIndex] = useState(0);
  const [currentFinderItem, setCurrentFinderItem] = useState(null);
  const [history, setHistory] = useState([finderItems.filter(item => item.parentId === null)[0].id]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [clipboard, setClipboard] = useState(null);
  const [isCut, setIsCut] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const {requiredItemId, isTrash} = extraProps;

  useEffect(() => {
    if(requiredItemId) {
      setCurrentFinderItem(requiredItemId);
    }
  }, [requiredItemId, isTrash]);


  // if(favourites.length === 0) {
  //   const rootId = finderItems.filter(item => item.parentId === null)[0].id;
  //   const favouriteItems = finderItems.filter(item => item.parentId === rootId);
  //   setFavourites(favouriteItems);
  // }

  if(currentFinderItem === null) {
    setCurrentFinderItem('macos');
  }

  const currentFolder = finderItems.find(item => item.id === currentFinderItem);
  const currentFileStructure = finderItems.filter(item => item.parentId === currentFinderItem);
  
  const openFolder = (id) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(id);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentFinderItem(id);
    setSelectedItem(null);
  }

  const newFolder = () => {
    createFolder("", finderItems, currentFinderItem, setFinderItems);
  }

  const deleteAnything = (id) => {
    deleteItem(id, finderItems, setFinderItems);
  }

  const moveToTrash = (id) => {
    moveItemToTrash(id, finderItems, setFinderItems);
  }

  const duplicateItem = (id) => {
    copyItem(id);
    pasteAnything();
  }

  const pasteAnything = () => {
    pasteItem(clipboard.id, currentFinderItem, finderItems, setFinderItems, isCut);
  }

  const copyItem = (id) => {
    const item = finderItems.find(item => item.id === id);
    setClipboard(item);
    console.log("Clipboard", item);
    setIsCut(false);
  }

  const cutItem = (id) => {
    const item = finderItems.find(item => item.id === id);
    setClipboard(item);
    setIsCut(true);
  }

  const goBack = () => {
    if (historyIndex > 0) {
      const newHistoryIndex = historyIndex - 1;
      setHistoryIndex(newHistoryIndex);
      setCurrentFinderItem(history[newHistoryIndex]);
      setSelectedItem(null);
    }
  }

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newHistoryIndex = historyIndex + 1;
      setHistoryIndex(newHistoryIndex);
      setCurrentFinderItem(history[newHistoryIndex]);
      setSelectedItem(null);
    }
  }

  const setSort = (sort) => {
    const updatedFinderItems = finderItems.map(item => {
      if (item.id === currentFinderItem) {
        return { ...item, sort: sort };
      }
      return item;
    });
    setFinderItems(updatedFinderItems);
  }

  const setView = (view) => {
    const updatedFinderItems = finderItems.map(item => {
      if (item.id === currentFinderItem) {
        return { ...item, view: view };
      }
      return item;
    });
    setFinderItems(updatedFinderItems);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e) => {
    setIsDraggingOver(false);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    
    const itemData = e.dataTransfer.getData('item');
    if (itemData) {
      const item = JSON.parse(itemData);
      const isItemPresent = favourites.some(favourite => favourite.id === item.id);
      if(isItemPresent) {
        return;
      }
      setFavourites([...favourites, item.id]);
    }
  };

  const showInEnclosingFolder = (item) => {
    openFolder(item.parentId);
    setSelectedItem(item.id);
  }

  const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (!file) return;
    
      // Read the file as a blob
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        const newFile = {
          id: getId(),
          name: file.name,
          isDir: false,
          content: imageUrl,
          parentId: currentFinderItem,
          dateCreated: new Date(),
          dateModified: new Date(),
          type: file.type,
          size: file.size
        };
        setFinderItems([...finderItems, newFile]);
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    };

  useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.ctrlKey || e.metaKey) {
          if (e.key === 'c' && selectedItem) {
            copyItem(selectedItem);
          }
          if (e.key === 'v' && clipboard) {
            pasteItem();
          }
          if (e.key === 'x' && selectedItem) {
            cutItem(selectedItem);
          }
          if (e.key == 'Backspace' && selectedItem) {
            console.log("Deleting", selectedItem);
            moveToTrash(selectedItem);
          }
        }
      };
    
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, clipboard, currentFinderItem]);

  return (
    <Window  isTransparent={true} {...props} 
      toolbar={
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <button disabled={historyIndex == 0} onClick={goBack} className='p-0.5 hover:bg-[#242227] rounded-md'>
              <ChevronLeft className={`${historyIndex == 0 ? 'text-[#5d5b5d]' : 'text-white'}`} />
            </button>
            <button disabled={historyIndex == history.length-1} onClick={goForward} className='p-0.5 hover:bg-[#242227] rounded-md'>
              <ChevronRight className={`${historyIndex == history.length-1 ? 'text-[#5d5b5d]' : 'text-white'}`} />
            </button>
            <p className='text-white text-sm font-semibold'>
              {currentFolder ? currentFolder.name : "Finder"}
            </p>
          </div>
          <div className="flex items-center gap-2 mx-4 text-[#c6c2c2]">
            <button onClick={() => newFolder()} className='p-1 px-2 hover:bg-[#242227] rounded-md'>
              <TbFolderPlus size={20} />
            </button>
            <button className='p-1 px-2 hover:bg-[#242227] rounded-md flex'>
              <FiGrid size={18} />
              <LuChevronsUpDown size={18} className="ml-0.5" />
            </button>
            <button className='p-1 px-2 hover:bg-[#242227] rounded-md'>
              <IoShareOutline className="" size={20} />
            </button>
            <button className='p-1 px-2 hover:bg-[#242227] rounded-md'>
              <Tag className="rotate-90" size={18} />
            </button>
            <button className='p-1 px-2 hover:bg-[#242227] rounded-md flex items-center'>
              <CircleEllipsis size={18} />
              <FaAngleDown size={10} className="ml-1" />
            </button>
            <button className='p-1 px-2 hover:bg-[#242227] rounded-md'>
              <IoSearch size={18} />
            </button>
          </div>
        </div>
      }
    >
      <div className="flex w-full h-full">
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="w-48 bg-[#2e292d] text-white text-sm overflow-auto h-full bg-opacity-70 backdrop-filter backdrop-blur-2xl p-2 px-2 flex flex-col">
          <p className="text-[#6d6c6c] text-[11px] m-1 font-semibold">Favourites</p>
          {favourites.map((fav, index) => {
            const item = finderItems.find(item => item.id === fav);
            return (
              <SidebarItem 
                key={index} 
                removeItem={() => setFavourites(favourites.filter(fav => fav !== item.id))}
                showInFolder={() => showInEnclosingFolder(item)}
                name={item.name} 
                isSelected={item.id === currentFinderItem} 
                onClick={() => openFolder(item.id)} 
              />
            )
          })}
        </div>
        <div className="h-full w-[1.5px] bg-black"></div>
        <div className="flex-1 bg-[#312c30]">
          <input
              type="file"
              id="file-upload"
              className='hidden'
              onChange={handleFileUpload}
          />
          <ContextMenu>
            <ContextMenuTrigger>
              <div className='h-full w-full overflow-auto'>
                {(currentFolder?.view || "icons") === "icons" ? (
                  <div className='w-full p-3 px-6 flex gap-x-4 gap-y-2 flex-wrap'>
                    {currentFileStructure && getSortedItems(currentFileStructure, currentFolder?.sort || "none").map((item, index) => {
                      if(item.isDir) {
                        return (
                          <Folder 
                            onFolderDelete={() => moveToTrash(item.id)}
                            isSelected={selectedItem === item.id}
                            onSelect={() => setSelectedItem(item.id)}
                            openFolder={() => openFolder(item.id)} 
                            folderName={item.name} 
                            key={index}
                            item={item}
                            onCopyItem={() => copyItem(item.id)}
                            onCutItem={() => cutItem(item.id)}
                            onFolderDuplicate={() => duplicateItem(item.id)}
                          />
                        )
                      }
                      return (
                        <File
                          onSelect={() => setSelectedItem(item.id)}
                          isSelected={selectedItem === item.id}
                          item={item}
                          key={index}
                          deleteItem={() => moveToTrash(item.id)}
                          copyItem={() => copyItem(item.id)}
                          cutItem={() => cutItem(item.id)}
                          duplicateItem={() => duplicateFolder(item.id)}
                        />
                      )
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col p-1 px-2 w-full">
                    <div className="flex items-center text-[#a09e9e] text-[11px] py-1">
                      <div className="w-5/12 px-8">Name</div>
                      <div className="w-3/12">Date Modified</div>
                      <div className="w-2/12">Size</div>
                      <div className="w-2/12">Kind</div>
                    </div>
                    {currentFileStructure && getSortedItems(currentFileStructure, currentFolder?.sort || "none").map((item, index) => {
                      if(item.isDir) {
                        return (
                          <ListViewFolder 
                            onFolderDelete={() => moveToTrash(item.id)}
                            isSelected={selectedItem === item.id}
                            onSelect={() => setSelectedItem(item.id)}
                            openFolder={() => openFolder(item.id)} 
                            folderName={item.name} 
                            key={index}
                            index={index}
                            item={item}
                            onCopyItem={() => copyItem(item.id)}
                            onCutItem={() => cutItem(item.id)}
                            onFolderDuplicate={() => duplicateItem(item.id)}
                          />
                        )
                      }
                      return (
                        <ListFile
                          item={item}
                          key={index}
                          index={index}
                          isSelected={selectedItem === item.id}
                          onSelect={() => setSelectedItem(item.id)}
                          deleteItem={() => moveToTrash(item.id)}
                          copyItem={() => copyItem(item.id)}
                          cutItem={() => cutItem(item.id)}
                          duplicateItem={() => duplicateItem(item.id)}
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            </ContextMenuTrigger>
            <FinderContextMenu
                onCreateFolder={() => newFolder()}
                onPasteItem={pasteAnything}
                canPaste={!!clipboard}
                sort={currentFolder?.sort || "none"}
                setSort={setSort}
                view={currentFolder?.view || "icons"}
                setView={setView}
                onAddFile={() => document.getElementById('file-upload').click()}
            />
        </ContextMenu>
        </div>
      </div>
    </Window>
  )
}

export default Finder