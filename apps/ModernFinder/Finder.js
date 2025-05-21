
import Window from "@/components/Window";
import SidebarItem from "./SidebarItem";
import { useState } from "react";
import useFinderStore from "@/stores/finder-store";
import { ChevronLeft, ChevronRight, CircleEllipsis } from "lucide-react";
import { TbFolderPlus } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { FiGrid } from "react-icons/fi";
import Folder from "./Folder";
import { createFolder, deleteItem, pasteItem } from "@/utils/fs-utils";
import FinderContextMenu from "@/components/context-menu/FinderContextMenu";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

const Finder = (props) => {

  const [selectedSidebarItem, setSelectedSidebarItem] = useState([]);
  const {favourites, setFavourites, finderItems, setFinderItems} = useFinderStore();
  const [historyIndex, setHistoryIndex] = useState(0);
  const [currentFinderItem, setCurrentFinderItem] = useState(null);
  const [history, setHistory] = useState([finderItems.filter(item => item.parentId === null)[0].id]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [clipboard, setClipboard] = useState(null);

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

  }

  const pasteAnything = () => {
    pasteItem(clipboard.id, currentFinderItem, finderItems, setFinderItems, true);
  }

  const copyItem = (id) => {
    const item = finderItems.find(item => item.id === id);
    setClipboard(item);
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
              Home
            </p>
          </div>
          <div className="flex items-center gap-4 mx-4 text-[#c6c2c2]">
            <button onClick={() => newFolder()} className='p-0.5 hover:bg-[#242227] rounded-md'>
              <TbFolderPlus size={18} />
            </button>
            <button className='p-0.5 hover:bg-[#242227] rounded-md'>
              <FiGrid size={18} />
            </button>
            <button className='p-0.5 hover:bg-[#242227] rounded-md'>
              <CircleEllipsis size={18} />
            </button>
            <button className='p-0.5 hover:bg-[#242227] rounded-md'>
              <IoSearch size={18} />
            </button>
          </div>
        </div>
      }
    >
      <div className="flex w-full h-full">
        <div className="w-48 bg-[#2e292d] text-white text-sm overflow-auto h-full bg-opacity-70 backdrop-filter backdrop-blur-2xl p-2 px-2 flex flex-col">
          {favourites.map((item, index) => {
            const isSelected = selectedSidebarItem === index;
            return (
              <SidebarItem 
                key={index} 
                name={item.name} 
                isSelected={isSelected} 
                onClick={() => setSelectedSidebarItem(index)} 
              />
            )
          })}
        </div>
        <div className="h-full w-[1.5px] bg-black"></div>
        <div className="flex-1 bg-[#312c30]">
          <ContextMenu>
            <ContextMenuTrigger>
              <div className='h-full w-full'>
                <div className='w-full p-3 px-6 flex gap-x-4 gap-y-2 flex-wrap'>
                  {currentFileStructure && currentFileStructure.map((item, index) => {
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
                        />
                      )
                    }
                  })}
                </div>
              </div>
            </ContextMenuTrigger>
            <FinderContextMenu
                onCreateFolder={() => newFolder()}
                onDuplicateFolder={duplicateFolder}
                onPasteItem={pasteAnything}
                canPaste={!!clipboard}
                // onAddFile={() => document.getElementById('file-upload').click()}
                // onCreateFile={createFile}
            />
        </ContextMenu>
        </div>
      </div>
    </Window>
  )
}

export default Finder