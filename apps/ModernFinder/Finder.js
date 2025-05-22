
import Window from "@/components/Window";
import SidebarItem from "./SidebarItem";
import { useState } from "react";
import useFinderStore from "@/stores/finder-store";
import { ChevronLeft, ChevronRight, CircleEllipsis, Tag } from "lucide-react";
import { TbFolderPlus } from "react-icons/tb";
import { IoPricetagOutline, IoSearch } from "react-icons/io5";
import { FiGrid } from "react-icons/fi";
import Folder from "./Folder";
import { createFolder, deleteItem, getSortedItems, pasteItem } from "@/utils/fs-utils";
import FinderContextMenu from "@/components/context-menu/FinderContextMenu";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import ListViewFolder from "./ListViewFolder";
import { LuChevronsUpDown } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa6";

const Finder = (props) => {

  const {favourites, setFavourites, finderItems, setFinderItems} = useFinderStore();
  const [historyIndex, setHistoryIndex] = useState(0);
  const [currentFinderItem, setCurrentFinderItem] = useState(null);
  const [history, setHistory] = useState([finderItems.filter(item => item.parentId === null)[0].id]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [clipboard, setClipboard] = useState(null);
  const [isCut, setIsCut] = useState(false);

  if(favourites.length === 0) {
    const rootId = finderItems.filter(item => item.parentId === null)[0].id;
    const favouriteItems = finderItems.filter(item => item.parentId === rootId);
    setFavourites(favouriteItems);
  }

  if(currentFinderItem === null) {
    const rootId = finderItems.filter(item => item.parentId === null)[0].id;
    setCurrentFinderItem(rootId);
  }

  const currentFileStructure = finderItems.filter(item => item.parentId === currentFinderItem);
  const currentFolder = finderItems.find(item => item.id === currentFinderItem);

  const openFolder = (id) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(id);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentFinderItem(id);
  }

  const newFolder = () => {
    createFolder("", finderItems, currentFinderItem, setFinderItems);
  }

  const deleteAnything = (id) => {
    deleteItem(id, finderItems, setFinderItems);
  }

  const duplicateFolder = (id) => {
    copyItem(id);
    pasteAnything();
  }

  const pasteAnything = () => {
    pasteItem(clipboard.id, currentFinderItem, finderItems, setFinderItems, isCut);
  }

  const copyItem = (id) => {
    const item = finderItems.find(item => item.id === id);
    setClipboard(item);
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
    }
  }

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newHistoryIndex = historyIndex + 1;
      setHistoryIndex(newHistoryIndex);
      setCurrentFinderItem(history[newHistoryIndex]);
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
        <div className="w-48 bg-[#2e292d] text-white text-sm overflow-auto h-full bg-opacity-70 backdrop-filter backdrop-blur-2xl p-2 px-2 flex flex-col">
          {favourites.map((item, index) => {
            return (
              <SidebarItem 
                key={index} 
                name={item.name} 
                isSelected={item.id === currentFinderItem} 
                onClick={() => openFolder(item.id)} 
              />
            )
          })}
        </div>
        <div className="h-full w-[1.5px] bg-black"></div>
        <div className="flex-1 bg-[#312c30]">
          <ContextMenu>
            <ContextMenuTrigger>
              <div className='h-full w-full'>
                {(currentFolder?.view || "icons") === "icons" ? (
                  <div className='w-full p-3 px-6 flex gap-x-4 gap-y-2 flex-wrap'>
                    {currentFileStructure && getSortedItems(currentFileStructure, currentFolder?.sort || "none").map((item, index) => {
                      if(item.isDir) {
                        return (
                          <Folder 
                            onFolderDelete={() => deleteAnything(item.id)}
                            isSelected={selectedItem === index}
                            onSelect={() => setSelectedItem(index)}
                            openFolder={() => openFolder(item.id)} 
                            folderName={item.name} 
                            key={index}
                            onCopyItem={() => copyItem(item.id)}
                            onCutItem={() => cutItem(item.id)}
                            onFolderDuplicate={() => duplicateFolder(item.id)}
                          />
                        )
                      }
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col p-1 px-2 w-full">
                    <div className="flex items-center text-[#a09e9e] text-[11px] py-1">
                      <div className="w-5/12 px-8">Name</div>
                      <div className="w-3/12">Date Modified</div>
                      <div className="w-1/12">Size</div>
                      <div className="w-3/12">Kind</div>
                    </div>
                    {currentFileStructure && getSortedItems(currentFileStructure, currentFolder?.sort || "none").map((item, index) => {
                      if(item.isDir) {
                        return (
                          <ListViewFolder 
                            onFolderDelete={() => deleteAnything(item.id)}
                            isSelected={selectedItem === index}
                            onSelect={() => setSelectedItem(index)}
                            openFolder={() => openFolder(item.id)} 
                            folderName={item.name} 
                            key={index}
                            index={index}
                            item={item}
                            onCopyItem={() => copyItem(item.id)}
                            onCutItem={() => cutItem(item.id)}
                            onFolderDuplicate={() => duplicateFolder(item.id)}
                          />
                        )
                      }
                    })}
                  </div>
                )}
              </div>
            </ContextMenuTrigger>
            <FinderContextMenu
                onCreateFolder={() => newFolder()}
                onDuplicateFolder={duplicateFolder}
                onPasteItem={pasteAnything}
                canPaste={!!clipboard}
                sort={currentFolder?.sort || "none"}
                setSort={setSort}
                view={currentFolder?.view || "icons"}
                setView={setView}
            />
        </ContextMenu>
        </div>
      </div>
    </Window>
  )
}

export default Finder