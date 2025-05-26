
import Window from "@/components/Window";
import ShortcutItem from "./ShortcutItem";
import { FaPlus } from "react-icons/fa6";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { addWifi, getDefaultAction, shortActions } from "./ShortcutUtils";
import { RxCross2 } from "react-icons/rx";
import WifiShortcut from "./ui/WifiShortcut";
import { FaPlay, FaSave } from "react-icons/fa";
import BluetoothShortcut from "./ui/BluetoothShortcut";
import ShutdownShortcut from "./ui/ShutdownShortcut";
import OpenAppShortcut from "./ui/OpenAppShortcut";
import CloseAppShortcut from "./ui/CloseAppShortcut";
import useShortcutsStore from "@/stores/shortcuts-store";

const Shortcuts = ({fileStructure, setFileStructure, ...props}) => {

    const [isOpen, setIsOpen] = useState(false);
    const {shortcuts, addShortcut, setShortcuts} = useShortcutsStore();

    const [shortcutItems, setShortcutItems] = useState([]);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [shortcutName, setShortcutName] = useState("");
    const [openedShortcut, setOpenedShortcut] = useState(null);

  const handleDragStart = (e, action) => {
    e.dataTransfer.setData('action', JSON.stringify(action));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const reomveShortcutItem = (index) => {
    const newItems = [...shortcutItems];
    newItems.splice(index, 1);
    setShortcutItems(newItems);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    
    const actionData = e.dataTransfer.getData('action');
    if (actionData) {
      const action = JSON.parse(actionData);
      const defaultAction = getDefaultAction(action);
      setShortcutItems([...shortcutItems, defaultAction]);
    }
  };

  const addShortcutAction = (action) => {
    const defaultAction = getDefaultAction(action);
    setShortcutItems([...shortcutItems, defaultAction]);
  }

    const images = {
        "controls": "settings.png",
        "notes": "notes.png",
        "device": "settings.png",
        "web": "safari.png",
        "clock": "clock.png"
    }

    const openShortcut = (index) => {
        const shortcut = shortcuts[index];
        setShortcutName(shortcut.name);
        setShortcutItems(shortcut.items);
        setIsOpen(true);
        setOpenedShortcut(index);
    }

    const closeShortcut = () => {
        console.log("close shortcut");
        setShortcutItems([]);
        setShortcutName("");
        setIsOpen(false);
        setOpenedShortcut(null);
    }

    const createShortcut = () => {
        setIsOpen(true);
    }

    const saveShortcut = () => {
        console.log("save shortcut");
        console.log(shortcutItems);
        if(shortcutItems.length > 0 && shortcutName.trim() !== "") {
            if(openedShortcut !== null) {
                const updatedShortcuts = [...shortcuts];
                updatedShortcuts[openedShortcut] = {
                    name: shortcutName,
                    items: shortcutItems,
                    image: images[shortcutItems[0].category] || "default.png"
                };
                setShortcuts(updatedShortcuts);
            }
            else {
                const newShortcut = {
                    name: shortcutName,
                    items: shortcutItems,
                    image: images[shortcutItems[0].category] || "default.png"
                };
                addShortcut(newShortcut);
            }
            setShortcutItems([]);
            setShortcutName("");
            setIsOpen(false);
        } else {
            alert("Please add items and provide a name for the shortcut.");
        }
    }



  return (
    <Window {...props} 
        // isFixed={true}
        customSize={{width: 500, height: 500}}
        toolbar={
            <div className="flex justify-between items-center pl-2 pr-4">
                <div className="flex items-center gap-1">
                    <button onClick={closeShortcut} disabled={!isOpen} className='p-0.5 hover:bg-[#242227] rounded-md'>
                        <ChevronLeft className={`${!isOpen ? 'text-[#5d5b5d]' : 'text-white'}`} />
                    </button>
                    {isOpen && shortcutItems && shortcutItems.length > 0 && <img src={images[shortcutItems[0].category]} className="w-5 h-5" />}
                    {isOpen && <input value={shortcutName} onChange={(e) => setShortcutName(e.target.value)} className="outline-none bg-transparent text-sm font-semibold text-white" type="text" placeholder="Title"/>}
                </div>
                <div className="flex gap-4 items-center">
                    <FaPlay className="text-[#9f9d9d]"/>
                    <FaSave onClick={saveShortcut} className="text-[#9f9d9d]"/>
                    <FaPlus onClick={createShortcut} className="text-[#9f9d9d]"/>
                </div>
            </div>
        }
    >
        {isOpen ? (
            <div className="w-full h-full flex">
                <div 
                    className={`w-3/4 ${isDraggingOver ? 'bg-gray-700' : 'bg-transparent'} transition-colors duration-200 relative flex flex-col items-center p-2 text-white gap-2`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >                    
                    {/* Render items in left area */}
                    {shortcutItems.map((item, index) => {
                        
                        if(item.name == "wifi") return <WifiShortcut shortcutItems={shortcutItems} setShortcutItems={setShortcutItems} index={index} item={item} removeItem={() => reomveShortcutItem(index)} key={index}/>
                        else if(item.name == "bluetooth") return <BluetoothShortcut shortcutItems={shortcutItems} setShortcutItems={setShortcutItems} index={index} item={item} removeItem={() => reomveShortcutItem(index)} key={index}/>
                        else if(item.name == "shutdown") return <ShutdownShortcut shortcutItems={shortcutItems} setShortcutItems={setShortcutItems} index={index} item={item} removeItem={() => reomveShortcutItem(index)} key={index}/>
                        else if(item.name == "open_app") return <OpenAppShortcut shortcutItems={shortcutItems} setShortcutItems={setShortcutItems} index={index} item={item} removeItem={() => reomveShortcutItem(index)} key={index}/>
                        else if(item.name == "close_app") return <CloseAppShortcut shortcutItems={shortcutItems} setShortcutItems={setShortcutItems} index={index} item={item} removeItem={() => reomveShortcutItem(index)} key={index}/>

                        return <div draggable key={index} className="flex items-center group justify-between text-sm py-2 font-medium bg-[#2f2f30] p-2 w-2/3 rounded-xl border-2 border-[#464646]">
                            <div className="flex items-center gap-2">
                                <img src={images[item.category]} className="w-6 h-6" alt={item.category} />
                                <p>{item.title}</p>
                            </div>
                            <RxCross2 onClick={() => reomveShortcutItem(index)} className="text-gray-300 hidden group-hover:block"/>
                        </div>
                    })}
                </div>
                
                <div className="bg-[#323233] w-1/4 border-l border-[#000] p-2 text-white overflow-auto">
                    {shortActions.map((action) => (
                    <div 
                        onDoubleClick={() => addShortcutAction(action)}
                        key={action.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, action)}
                        className="flex items-center px-2 rounded-lg text-[13px] gap-2 py-1 cursor-grab hover:bg-[#404041]"
                    >
                        <img src={images[action.category]} className="w-5 h-5" alt={action.category} />
                        <p>{action.title}</p>
                    </div>
                    ))}
                </div>
            </div>
        ) : (
            <div className="w-full p-4 h-fit flex gap-4 gap-y-4 flex-wrap">
                {shortcuts && shortcuts.map((shortcut, index) => (
                    <ShortcutItem shortcut={shortcut} openShortcut={() => openShortcut(index)} key={index} color={(index+1)%16}/>
                ))}
                {/* <ShortcutItem openShortcut={openShortcut} color={1}/>
                <ShortcutItem openShortcut={openShortcut} color={2}/>
                <ShortcutItem openShortcut={openShortcut} color={3}/>
                <ShortcutItem openShortcut={openShortcut} color={4}/>
                <ShortcutItem openShortcut={openShortcut} color={5}/>
                <ShortcutItem openShortcut={openShortcut} color={6}/>
                <ShortcutItem openShortcut={openShortcut} color={7}/>
                <ShortcutItem openShortcut={openShortcut} color={8}/>
                <ShortcutItem openShortcut={openShortcut} color={9}/>
                <ShortcutItem openShortcut={openShortcut} color={10}/> */}
            </div>
        )}
    </Window>
  )
}

export default Shortcuts